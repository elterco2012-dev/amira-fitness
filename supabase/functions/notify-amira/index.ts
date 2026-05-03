import webpush from "npm:web-push@3";

const VAPID_PUBLIC  = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE = Deno.env.get("VAPID_PRIVATE_KEY")!;
const SB_URL        = Deno.env.get("SUPABASE_URL")!;
const SB_SVC        = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
};

webpush.setVapidDetails("mailto:hola@amira.fitness", VAPID_PUBLIC, VAPID_PRIVATE);

async function dbFetch(path: string): Promise<unknown> {
  const r = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { apikey: SB_SVC, Authorization: `Bearer ${SB_SVC}` }
  });
  if (!r.ok) throw new Error(`DB ${r.status}: ${await r.text()}`);
  return r.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });

  let payload: { type?: string; table?: string; record?: Record<string, unknown> };
  try {
    payload = await req.json();
  } catch {
    return new Response("Bad request", { status: 400, headers: CORS });
  }

  const { type, table, record } = payload;
  if (type !== "INSERT" || !record) {
    return Response.json({ skipped: true }, { headers: CORS });
  }

  // Build notification content
  let title = "📬 Nueva actividad";
  let body = "Revisá el panel.";

  try {
    const alumnaId = record.alumna_id as number | undefined;
    let alumnaName = "";
    if (alumnaId) {
      const rows = await dbFetch(
        `alumnas?select=nombre&id=eq.${alumnaId}&limit=1`
      ) as Array<{ nombre: string }>;
      alumnaName = rows[0]?.nombre?.split(" ")[0] || "";
    }

    if (table === "feedbacks") {
      const tipo = String(record.tipo || "");
      const texto = String(record.texto || "");
      const emojiMap: Record<string, string> = {
        dolor_preocupante: "🚨",
        bajo_rendimiento: "⚠️",
        bueno: "😊",
        excelente: "🔥",
      };
      title = `${emojiMap[tipo] || "💬"} Feedback — ${alumnaName || "alumna"}`;
      body = texto ? texto.slice(0, 120) : `Tipo: ${tipo}`;
    } else if (table === "comentarios") {
      const texto = String(record.texto || record.contenido || "");
      title = `💬 Nota — ${alumnaName || "alumna"}`;
      body = texto ? texto.slice(0, 120) : "Nueva nota desde la app";
    }
  } catch (e) {
    console.warn("Could not build message:", e);
  }

  // Fetch ALL of Amira's subscriptions (one per device)
  let subs: Array<{ endpoint: string; p256dh: string; auth: string }> = [];
  try {
    subs = await dbFetch(
      "amira_push_subscriptions?select=endpoint,p256dh,auth"
    ) as typeof subs;
  } catch (e) {
    console.error("DB error fetching Amira subs:", e);
    return Response.json({ error: "db error" }, { status: 500, headers: CORS });
  }

  console.log(`Sending to ${subs.length} Amira device(s): ${title}`);

  if (!subs.length) {
    return Response.json({ sent: 0, reason: "no subscriptions" }, { headers: CORS });
  }

  const results = await Promise.allSettled(
    subs.map(async (sub, i) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify({ type: "amira-alert", title, body, url: "/panel/" })
        );
      } catch (e: unknown) {
        const err = e as { statusCode?: number; body?: string; message?: string };
        throw { device: i, statusCode: err.statusCode, fcmBody: err.body, message: err.message };
      }
    })
  );

  const sent   = results.filter(r => r.status === "fulfilled").length;
  const failed = results.filter(r => r.status === "rejected").length;
  const errors = results
    .filter(r => r.status === "rejected")
    .map(r => (r as PromiseRejectedResult).reason);

  return Response.json({ sent, failed, total: subs.length, errors }, { headers: CORS });
});

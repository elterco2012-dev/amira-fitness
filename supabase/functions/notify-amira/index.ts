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

  // Only process INSERT events with a record
  if (type !== "INSERT" || !record) {
    return Response.json({ skipped: true }, { headers: CORS });
  }

  // Build notification content based on which table fired
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
      const emoji = emojiMap[tipo] || "💬";
      title = `${emoji} Feedback — ${alumnaName || "alumna"}`;
      body = texto ? texto.slice(0, 120) : `Tipo: ${tipo}`;
    } else if (table === "comentarios") {
      const texto = String(record.texto || record.contenido || "");
      title = `💬 Nota — ${alumnaName || "alumna"}`;
      body = texto ? texto.slice(0, 120) : "Nueva nota desde la app";
    }
  } catch (e) {
    console.warn("Could not build message:", e);
  }

  // Fetch Amira's subscription (alumna_id = 0)
  let subs: Array<{ endpoint: string; p256dh: string; auth: string }> = [];
  try {
    subs = await dbFetch(
      "push_subscriptions?alumna_id=eq.0&select=endpoint,p256dh,auth"
    ) as typeof subs;
  } catch (e) {
    console.error("DB error fetching Amira sub:", e);
    return Response.json({ error: "db error" }, { status: 500, headers: CORS });
  }

  if (!subs.length) {
    console.log("No Amira push subscription (alumna_id=0)");
    return Response.json({ sent: 0, reason: "no subscription" }, { headers: CORS });
  }

  try {
    const sub = subs[0];
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      JSON.stringify({ type: "amira-alert", title, body, url: "/panel/" })
    );
    console.log(`Amira push sent: ${title}`);
    return Response.json({ sent: 1 }, { headers: CORS });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("Push failed:", msg);
    return Response.json({ error: msg }, { status: 500, headers: CORS });
  }
});

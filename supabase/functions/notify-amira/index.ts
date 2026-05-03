import webpush from "npm:web-push@3";

const VAPID_PUBLIC  = Deno.env.get("VAPID_PUBLIC_KEY") ?? "";
const VAPID_PRIVATE = Deno.env.get("VAPID_PRIVATE_KEY") ?? "";
const SB_URL        = Deno.env.get("SUPABASE_URL") ?? "";
const SB_SVC        = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const SB_ANON       = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
};

let vapidReady = false;
try {
  webpush.setVapidDetails("mailto:hola@amira.fitness", VAPID_PUBLIC, VAPID_PRIVATE);
  vapidReady = true;
} catch (e) {
  console.error("setVapidDetails failed:", e);
}

async function dbFetch(path: string): Promise<unknown> {
  for (const key of [SB_SVC, SB_ANON]) {
    if (!key) continue;
    const r = await fetch(`${SB_URL}/rest/v1/${path}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    if (r.ok) return r.json();
    if (key === SB_ANON) throw new Error(`DB ${r.status}: ${await r.text()}`);
  }
  throw new Error("No DB key available");
}

Deno.serve(async (req) => {
  // Wrap everything so we NEVER return a 500 from the runtime
  try {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });

    if (!vapidReady) {
      return Response.json({
        error: "VAPID not ready",
        pub: VAPID_PUBLIC.slice(0, 10),
        priv: VAPID_PRIVATE ? "set" : "missing"
      }, { headers: CORS });
    }

    let payload: { type?: string; table?: string; record?: Record<string, unknown> };
    try { payload = await req.json(); }
    catch { return new Response("Bad request", { status: 400, headers: CORS }); }

    const { type, table, record } = payload;
    if (type !== "INSERT" || !record) {
      return Response.json({ skipped: true }, { headers: CORS });
    }

    let title = "📬 Nueva actividad";
    let notifBody = "Revisá el panel.";

    try {
      const alumnaId = record.alumna_id as number | undefined;
      let alumnaName = "";
      if (alumnaId) {
        const rows = await dbFetch(`alumnas?select=nombre&id=eq.${alumnaId}&limit=1`) as Array<{ nombre: string }>;
        alumnaName = rows[0]?.nombre?.split(" ")[0] || "";
      }
      if (table === "feedbacks") {
        const tipo = String(record.tipo || "");
        const texto = String(record.texto || "");
        const em: Record<string, string> = { dolor_preocupante: "🚨", bajo_rendimiento: "⚠️", bueno: "😊", excelente: "🔥" };
        title = `${em[tipo] || "💬"} Feedback — ${alumnaName || "alumna"}`;
        notifBody = texto ? texto.slice(0, 120) : `Tipo: ${tipo}`;
      } else if (table === "comentarios") {
        const texto = String(record.texto || record.contenido || "");
        title = `💬 Nota — ${alumnaName || "alumna"}`;
        notifBody = texto ? texto.slice(0, 120) : "Nueva nota desde la app";
      }
    } catch (_) { /* non-fatal */ }

    let subs: Array<{ endpoint: string; p256dh: string; auth: string }> = [];
    try {
      subs = await dbFetch("amira_push_subscriptions?select=endpoint,p256dh,auth") as typeof subs;
    } catch (e) {
      return Response.json({ error: "db_fetch_failed", detail: String(e) }, { headers: CORS });
    }

    if (!subs.length) {
      return Response.json({ sent: 0, reason: "no subscriptions" }, { headers: CORS });
    }

    const pushResults: Array<{ device: number; ok: boolean; statusCode?: number; fcmBody?: string; err?: string }> = [];

    for (let i = 0; i < subs.length; i++) {
      const sub = subs[i];
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify({ type: "amira-alert", title, body: notifBody, url: "/panel/" })
        );
        pushResults.push({ device: i, ok: true });
      } catch (e: unknown) {
        const err = e as { statusCode?: number; body?: string; message?: string; stack?: string };
        pushResults.push({
          device: i,
          ok: false,
          statusCode: err.statusCode,
          fcmBody: err.body,
          err: err.message ?? String(e)
        });
      }
    }

    const sent = pushResults.filter(r => r.ok).length;
    return Response.json({ sent, total: subs.length, results: pushResults }, { headers: CORS });

  } catch (fatal: unknown) {
    const msg = fatal instanceof Error ? fatal.message : String(fatal);
    const stack = fatal instanceof Error ? fatal.stack : undefined;
    return Response.json({ fatal, fatalMsg: msg, stack }, { headers: CORS });
  }
});

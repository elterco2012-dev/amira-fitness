import webpush from "npm:web-push@3";

const VAPID_PUBLIC  = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE = Deno.env.get("VAPID_PRIVATE_KEY")!;
const SB_URL        = Deno.env.get("SUPABASE_URL")!;
const SB_KEY        = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
};

webpush.setVapidDetails("mailto:hola@amira.fitness", VAPID_PUBLIC, VAPID_PRIVATE);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: CORS });
  }

  // Accept any request with the apikey header (JWT verification disabled in settings)
  const apikey = req.headers.get("apikey") ?? req.headers.get("x-api-key") ?? "";
  if (!apikey) {
    return new Response("Unauthorized", { status: 401, headers: CORS });
  }

  try {
    let alumnaFilter = "";
    let customPayload: { title?: string; body?: string } = {};
    try {
      const body = await req.json();
      if (body?.alumna_id) alumnaFilter = `&alumna_id=eq.${body.alumna_id}`;
      if (body?.title) customPayload.title = body.title;
      if (body?.body) customPayload.body = body.body;
    } catch { /* no body is fine */ }

    const res = await fetch(
      `${SB_URL}/rest/v1/push_subscriptions?select=*,alumnas(nombre,slug)${alumnaFilter}`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
    );

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: `DB error: ${err}` }, { status: 500, headers: CORS });
    }

    const subs = await res.json() as Array<{
      endpoint: string; p256dh: string; auth: string;
      alumnas: { nombre: string; slug: string } | null;
    }>;

    if (!subs.length) {
      return Response.json({ sent: 0, failed: 0, total: 0 }, { headers: CORS });
    }

    const results = await Promise.allSettled(
      subs.map(sub => {
        const nombre = (sub.alumnas?.nombre ?? "").split(" ")[0] || "¡Hola!";
        const slug   = sub.alumnas?.slug ?? "";
        return webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify({
            title: customPayload.title ?? "💪 ¡Hora de entrenar!",
            body:  customPayload.body ?? `${nombre}, tu entrenamiento de hoy te espera`,
            url:   slug ? `/alumna/${slug}` : "/",
          })
        );
      })
    );

    const sent   = results.filter(r => r.status === "fulfilled").length;
    const failed = results.filter(r => r.status === "rejected").length;

    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`Push failed for sub ${i}:`, (r as PromiseRejectedResult).reason);
      }
    });

    return Response.json({ sent, failed, total: subs.length }, { headers: CORS });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("send-push error:", msg);
    return Response.json({ error: msg }, { status: 500, headers: CORS });
  }
});

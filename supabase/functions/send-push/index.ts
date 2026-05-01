import webpush from "npm:web-push@3";

const VAPID_PUBLIC  = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE = Deno.env.get("VAPID_PRIVATE_KEY")!;
const SB_URL        = Deno.env.get("SUPABASE_URL")!;
const SB_SVC        = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SB_ANON       = Deno.env.get("SUPABASE_ANON_KEY")!;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
};

webpush.setVapidDetails("mailto:hola@amira.fitness", VAPID_PUBLIC, VAPID_PRIVATE);

async function dbGet(path: string): Promise<unknown> {
  // Try service role first, fall back to anon key
  for (const [label, key] of [["svc", SB_SVC], ["anon", SB_ANON]] as const) {
    if (!key) continue;
    const url = `${SB_URL}/rest/v1/${path}`;
    console.log(`dbGet [${label}]: ${url}`);
    const r = await fetch(url, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    const txt = await r.text();
    console.log(`dbGet [${label}] status=${r.status} body=${txt.slice(0, 200)}`);
    if (!r.ok) {
      console.warn(`dbGet [${label}] failed: ${r.status}`);
      if (label === "anon") throw new Error(`DB ${r.status}: ${txt}`);
      continue; // try next key
    }
    return JSON.parse(txt);
  }
  throw new Error("No valid DB key available");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: CORS });
  }

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

    console.log(`alumnaFilter: "${alumnaFilter}"`);

    const subsRaw = await dbGet(`push_subscriptions?select=*${alumnaFilter}`) as Array<{
      endpoint: string; p256dh: string; auth: string; alumna_id: number;
    }>;

    console.log(`Found ${subsRaw.length} subscriptions`);

    if (!subsRaw.length) {
      return Response.json({ sent: 0, failed: 0, total: 0, debug: "no subs found" }, { headers: CORS });
    }

    // Fetch alumna names separately
    const alumnaIds = [...new Set(subsRaw.map(s => s.alumna_id))];
    let alumnas: Array<{ id: number; nombre: string; slug: string }> = [];
    try {
      alumnas = await dbGet(`alumnas?select=id,nombre,slug&id=in.(${alumnaIds.join(",")})`) as typeof alumnas;
    } catch (e) {
      console.warn("Could not fetch alumna names:", e);
    }
    const alumnaMap = new Map(alumnas.map(a => [a.id, a]));

    const results = await Promise.allSettled(
      subsRaw.map(sub => {
        const alumna = alumnaMap.get(sub.alumna_id);
        const nombre = (alumna?.nombre ?? "").split(" ")[0] || "¡Hola!";
        const slug   = alumna?.slug ?? "";
        console.log(`Sending push to alumna_id=${sub.alumna_id} endpoint=${sub.endpoint.slice(0, 50)}...`);
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

    console.log(`Done: sent=${sent} failed=${failed}`);
    return Response.json({ sent, failed, total: subsRaw.length }, { headers: CORS });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("send-push error:", msg);
    return Response.json({ error: msg }, { status: 500, headers: CORS });
  }
});

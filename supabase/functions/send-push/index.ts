// Native Deno Web Push — no npm:web-push, uses crypto.subtle + fetch only

const VAPID_PUBLIC  = Deno.env.get("VAPID_PUBLIC_KEY")  ?? "";
const VAPID_PRIVATE = Deno.env.get("VAPID_PRIVATE_KEY") ?? "";
const SB_URL        = Deno.env.get("SUPABASE_URL")       ?? "";
const SB_SVC        = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const SB_ANON       = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
};

const TE = new TextEncoder();

function b64u(data: ArrayBuffer | Uint8Array): string {
  const b = data instanceof Uint8Array ? data : new Uint8Array(data);
  let s = "";
  b.forEach(x => s += String.fromCharCode(x));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function fromb64u(s: string): Uint8Array {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const raw = atob(s);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

function cat(...a: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(a.reduce((n, x) => n + x.length, 0));
  let off = 0;
  for (const x of a) { out.set(x, off); off += x.length; }
  return out;
}

async function hkdf(salt: Uint8Array, ikm: Uint8Array, info: Uint8Array, len: number): Promise<Uint8Array> {
  const k = await crypto.subtle.importKey("raw", ikm, "HKDF", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: "HKDF", hash: "SHA-256", salt, info }, k, len * 8));
}

async function makeVapidJwt(endpoint: string): Promise<string> {
  const { origin } = new URL(endpoint);
  const now = Math.floor(Date.now() / 1000);
  const h = b64u(TE.encode(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const p = b64u(TE.encode(JSON.stringify({ aud: origin, sub: "mailto:hola@amira.fitness", exp: now + 43200 })));

  const d = fromb64u(VAPID_PRIVATE);
  const pkcs8 = cat(
    new Uint8Array([
      0x30, 0x41, 0x02, 0x01, 0x00, 0x30, 0x13,
      0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01,
      0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07,
      0x04, 0x27, 0x30, 0x25, 0x02, 0x01, 0x01, 0x04, 0x20,
    ]),
    d
  );

  const privKey = await crypto.subtle.importKey(
    "pkcs8", pkcs8, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, privKey, TE.encode(`${h}.${p}`));
  return `${h}.${p}.${b64u(sig)}`;
}

async function buildPushBody(payload: string, p256dhB64u: string, authB64u: string): Promise<Uint8Array> {
  const authSecret = fromb64u(authB64u);
  const uaPub = fromb64u(p256dhB64u);

  const kp = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"]);
  const asPub = new Uint8Array(await crypto.subtle.exportKey("raw", kp.publicKey));

  const uaKey = await crypto.subtle.importKey("raw", uaPub, { name: "ECDH", namedCurve: "P-256" }, false, []);
  const ecdhBits = await crypto.subtle.deriveBits({ name: "ECDH", public: uaKey }, kp.privateKey, 256);

  const info1 = cat(TE.encode("WebPush: info\x00"), uaPub, asPub);
  const ikm   = await hkdf(authSecret, new Uint8Array(ecdhBits), info1, 32);
  const salt  = crypto.getRandomValues(new Uint8Array(16));
  const cek   = await hkdf(salt, ikm, TE.encode("Content-Encoding: aes128gcm\x00"), 16);
  const nonce = await hkdf(salt, ikm, TE.encode("Content-Encoding: nonce\x00"), 12);

  const aesKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: nonce, tagLength: 128 },
    aesKey,
    cat(TE.encode(payload), new Uint8Array([0x02]))
  );

  const rs = new Uint8Array(4);
  new DataView(rs.buffer).setUint32(0, 4096, false);
  return cat(salt, rs, new Uint8Array([65]), asPub, new Uint8Array(ct));
}

async function sendPush(endpoint: string, p256dh: string, auth: string, payload: string): Promise<{ ok: boolean; status: number; body: string }> {
  const [jwt, pushBody] = await Promise.all([
    makeVapidJwt(endpoint),
    buildPushBody(payload, p256dh, auth)
  ]);
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `vapid t=${jwt},k=${VAPID_PUBLIC}`,
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "aes128gcm",
      "TTL": "86400",
    },
    body: pushBody
  });
  const body = await resp.text();
  return { ok: resp.ok, status: resp.status, body };
}

async function dbDelete(path: string): Promise<void> {
  for (const key of [SB_SVC, SB_ANON]) {
    if (!key) continue;
    const r = await fetch(`${SB_URL}/rest/v1/${path}`, {
      method: "DELETE",
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    if (r.ok) return;
  }
}

async function dbGet(path: string): Promise<unknown> {
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
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });

  const apikey = req.headers.get("apikey") ?? req.headers.get("x-api-key") ?? "";
  if (!apikey) return new Response("Unauthorized", { status: 401, headers: CORS });

  try {
    let alumnaFilter = "";
    let customTitle = "";
    let customBody = "";
    let filterByDay = false;
    try {
      const b = await req.json();
      if (b?.alumna_id) alumnaFilter = `&alumna_id=eq.${b.alumna_id}`;
      if (b?.title) customTitle = b.title;
      if (b?.body) customBody = b.body;
      if (b?.filter_by_day) filterByDay = true;
    } catch { /* no body is fine */ }

    const subs = await dbGet(`push_subscriptions?select=endpoint,p256dh,auth,alumna_id${alumnaFilter}`) as Array<{
      endpoint: string; p256dh: string; auth: string; alumna_id: number;
    }>;

    if (!subs.length) return Response.json({ sent: 0, failed: 0, total: 0, reason: "no_subscriptions" }, { headers: CORS });

    const alumnaIds = [...new Set(subs.map(s => s.alumna_id))];
    let alumnas: Array<{ id: number; nombre: string; slug: string; horario_entreno?: { dias?: number[] } }> = [];
    try {
      alumnas = await dbGet(`alumnas?select=id,nombre,slug,horario_entreno&id=in.(${alumnaIds.join(",")})`) as typeof alumnas;
    } catch (_) { /* names are optional */ }
    const alumnaMap = new Map(alumnas.map(a => [a.id, a]));

    // Filter by training day when requested (used by cron, not manual panel sends)
    let filteredSubs = subs;
    if (filterByDay && !alumnaFilter) {
      // Argentina is UTC-3; at 12:00 UTC the local day matches UTC day
      const todayDow = new Date().getUTCDay(); // 0=Sun … 6=Sat
      filteredSubs = subs.filter(s => {
        const alumna = alumnaMap.get(s.alumna_id);
        const dias = alumna?.horario_entreno?.dias ?? [];
        return dias.includes(todayDow);
      });
    }

    if (!filteredSubs.length) return Response.json({ sent: 0, failed: 0, total: 0, reason: "no_training_today" }, { headers: CORS });

    const results = await Promise.all(
      filteredSubs.map(async (sub, i) => {
        const alumna = alumnaMap.get(sub.alumna_id);
        const nombre = (alumna?.nombre ?? "").split(" ")[0] || "¡Hola!";
        const slug   = alumna?.slug ?? "";
        const payload = JSON.stringify({
          title: customTitle || "💪 ¡Hora de entrenar!",
          body:  customBody  || `${nombre}, tu entrenamiento de hoy te espera`,
          url:   slug ? `/alumna/${slug}` : "/alumna/",
        });
        try {
          const r = await sendPush(sub.endpoint, sub.p256dh, sub.auth, payload);
          if (r.status === 410 || r.status === 404) {
            await dbDelete(`push_subscriptions?endpoint=eq.${encodeURIComponent(sub.endpoint)}`).catch(() => {});
          }
          return { device: i, alumna_id: sub.alumna_id, ...r };
        } catch (e) {
          return { device: i, alumna_id: sub.alumna_id, ok: false, status: 0, body: String(e) };
        }
      })
    );

    const sent   = results.filter(r => r.ok).length;
    const failed = results.filter(r => !r.ok).length;
    return Response.json({ sent, failed, total: filteredSubs.length, results }, { headers: CORS });

  } catch (e) {
    return Response.json({ error: String(e), stack: e instanceof Error ? e.stack : undefined }, { headers: CORS });
  }
});

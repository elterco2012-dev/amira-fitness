// Resumen semanal automático para Amira (domingos a la noche).
// Envía un push con el panorama de la semana: cuántas entrenaron,
// cuántas necesitan atención y feedbacks importantes.

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

function dayDiff(iso: string): number {
  const t = new Date(iso).getTime();
  return Math.floor((Date.now() - t) / 86400000);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });

  const apikey = req.headers.get("apikey") ?? req.headers.get("x-api-key") ?? "";
  if (!apikey) return new Response("Unauthorized", { status: 401, headers: CORS });

  try {
    // ── Cómputo de stats ─────────────────────────────────────────
    const alumnas = await dbFetch("alumnas?select=id,estado,last_active_at,created_at") as Array<{
      id: number; estado?: string | null; last_active_at?: string | null; created_at?: string;
    }>;
    const activas = alumnas.filter(a => !a.estado || a.estado === "activa");

    const entrenaron = activas.filter(a => a.last_active_at && dayDiff(a.last_active_at) < 7).length;
    const necesitanAtencion = activas.filter(a => {
      if (!a.last_active_at) {
        // nunca entrenó pero ya pasó >21 días desde que se sumó
        if (!a.created_at) return false;
        return dayDiff(a.created_at) > 21;
      }
      return dayDiff(a.last_active_at) >= 4;
    }).length;

    const sinceISO = new Date(Date.now() - 7 * 86400000).toISOString();
    let dolores = 0;
    try {
      const fbs = await dbFetch(
        `feedbacks?select=id&tipo=in.(dolor_preocupante,dolor_articular)&created_at=gte.${encodeURIComponent(sinceISO)}`
      ) as Array<{ id: number }>;
      dolores = fbs.length;
    } catch (_) { /* opcional */ }

    // ── Composición del mensaje ──────────────────────────────────
    const total = activas.length;
    const title = "📊 Resumen de la semana";
    const partes: string[] = [];
    partes.push(`${entrenaron} de ${total} alumnas entrenaron esta semana`);
    if (necesitanAtencion > 0) partes.push(`${necesitanAtencion} ${necesitanAtencion === 1 ? "necesita" : "necesitan"} atención`);
    if (dolores > 0) partes.push(`${dolores} ${dolores === 1 ? "reporte" : "reportes"} de dolor`);
    const body = partes.join(" · ");

    // ── Envío ────────────────────────────────────────────────────
    let subs: Array<{ endpoint: string; p256dh: string; auth: string }> = [];
    try {
      subs = await dbFetch("amira_push_subscriptions?select=endpoint,p256dh,auth") as typeof subs;
    } catch (e) {
      return Response.json({ error: "db_failed", detail: String(e) }, { headers: CORS });
    }

    if (!subs.length) {
      return Response.json({ sent: 0, total: 0, reason: "no_subscriptions", stats: { total, entrenaron, necesitanAtencion, dolores } }, { headers: CORS });
    }

    const notifPayload = JSON.stringify({ type: "amira-summary", title, body, url: "/panel/" });
    const results = await Promise.all(
      subs.map(async (s, i) => {
        try {
          const r = await sendPush(s.endpoint, s.p256dh, s.auth, notifPayload);
          if (r.status === 410 || r.status === 404) {
            await dbDelete(`amira_push_subscriptions?endpoint=eq.${encodeURIComponent(s.endpoint)}`).catch(() => {});
          }
          return { device: i, ...r };
        } catch (e) {
          return { device: i, ok: false, status: 0, body: String(e) };
        }
      })
    );

    return Response.json({
      sent: results.filter(r => r.ok).length,
      total: subs.length,
      stats: { total, entrenaron, necesitanAtencion, dolores },
      title,
      body,
      results
    }, { headers: CORS });

  } catch (e) {
    return Response.json({ error: String(e), stack: e instanceof Error ? e.stack : undefined }, { headers: CORS });
  }
});

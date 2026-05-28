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

// ── Helpers ────────────────────────────────────────────────────

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

// ── HKDF helper ────────────────────────────────────────────────

async function hkdf(salt: Uint8Array, ikm: Uint8Array, info: Uint8Array, len: number): Promise<Uint8Array> {
  const k = await crypto.subtle.importKey("raw", ikm, "HKDF", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: "HKDF", hash: "SHA-256", salt, info }, k, len * 8));
}

// ── VAPID JWT ──────────────────────────────────────────────────

async function makeVapidJwt(endpoint: string): Promise<string> {
  const { origin } = new URL(endpoint);
  const now = Math.floor(Date.now() / 1000);
  const h = b64u(TE.encode(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const p = b64u(TE.encode(JSON.stringify({ aud: origin, sub: "mailto:hola@amira.fitness", exp: now + 43200 })));

  // Use JWK format — avoids manual PKCS8 construction which breaks if key has whitespace or wrong length
  const pub = fromb64u(VAPID_PUBLIC.trim());
  const privKey = await crypto.subtle.importKey(
    "jwk",
    {
      kty: "EC", crv: "P-256",
      d: VAPID_PRIVATE.trim().replace(/=/g, ""),
      x: b64u(pub.slice(1, 33)),
      y: b64u(pub.slice(33, 65)),
    },
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, privKey, TE.encode(`${h}.${p}`));
  return `${h}.${p}.${b64u(sig)}`;
}

// ── Web Push encryption (RFC 8291, aes128gcm) ──────────────────

async function buildPushBody(
  payload: string,
  p256dhB64u: string,
  authB64u: string
): Promise<Uint8Array> {
  const authSecret = fromb64u(authB64u);
  const uaPub = fromb64u(p256dhB64u); // client uncompressed EC point (65 bytes)

  // Ephemeral server key pair
  const kp = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"]);
  const asPub = new Uint8Array(await crypto.subtle.exportKey("raw", kp.publicKey));

  // ECDH shared secret
  const uaKey = await crypto.subtle.importKey("raw", uaPub, { name: "ECDH", namedCurve: "P-256" }, false, []);
  const ecdhBits = await crypto.subtle.deriveBits({ name: "ECDH", public: uaKey }, kp.privateKey, 256);

  // RFC 8291 key derivation
  const info1 = cat(TE.encode("WebPush: info\x00"), uaPub, asPub);
  const ikm   = await hkdf(authSecret, new Uint8Array(ecdhBits), info1, 32);
  const salt  = crypto.getRandomValues(new Uint8Array(16));
  const cek   = await hkdf(salt, ikm, TE.encode("Content-Encoding: aes128gcm\x00"), 16);
  const nonce = await hkdf(salt, ikm, TE.encode("Content-Encoding: nonce\x00"), 12);

  // Encrypt with AES-128-GCM
  const aesKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: nonce, tagLength: 128 },
    aesKey,
    cat(TE.encode(payload), new Uint8Array([0x02]))  // payload + delimiter
  );

  // aes128gcm header: salt(16) + rs(4 BE) + idlen(1=65) + server_pub(65)
  const rs = new Uint8Array(4);
  new DataView(rs.buffer).setUint32(0, 4096, false);
  return cat(salt, rs, new Uint8Array([65]), asPub, new Uint8Array(ct));
}

// ── Send one push ──────────────────────────────────────────────

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

// ── DB helper ──────────────────────────────────────────────────

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


Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });

    let payload: { type?: string; table?: string; record?: Record<string, unknown> };
    try { payload = await req.json(); }
    catch { return new Response("Bad request", { status: 400, headers: CORS }); }

    const { type, table, record } = payload;
    if (type !== "INSERT" || !record) return Response.json({ skipped: true }, { headers: CORS });

    let title = "📬 Nueva actividad";
    let body  = "Revisá el panel.";

    try {
      const alumnaId = record.alumna_id as number | undefined;
      let name = "";
      if (alumnaId) {
        const rows = await dbFetch(`alumnas?select=nombre&id=eq.${alumnaId}&limit=1`) as Array<{ nombre: string }>;
        name = rows[0]?.nombre?.split(" ")[0] || "";
      }
      if (table === "feedbacks") {
        const tipo = String(record.tipo || "");
        const em: Record<string, string> = {
          dolor_preocupante:  "🚨",
          dolor_articular:    "⚠️",
          ejercicio_problema: "🔧",
          bajo_rendimiento:   "📉",
          dolor_normal:       "💪",
          bueno:              "😊",
          excelente:          "🔥",
        };
        title = `${em[tipo] || "💬"} Feedback — ${name || "alumna"}`;
        body  = String(record.nota || record.texto || `Tipo: ${tipo}`).slice(0, 120);
      } else if (table === "comentarios") {
        title = `💬 Nota — ${name || "alumna"}`;
        body  = String(record.texto || record.contenido || "Nueva nota desde la app").slice(0, 120);
      } else if (table === "notas_sesion") {
        title = `📝 Nota de Amira — ${name || "alumna"}`;
        body  = String(record.nota || "Nueva nota guardada").slice(0, 120);
      }
    } catch (_) { /* non-fatal */ }

    let subs: Array<{ endpoint: string; p256dh: string; auth: string }> = [];
    try {
      subs = await dbFetch("amira_push_subscriptions?select=endpoint,p256dh,auth") as typeof subs;
    } catch (e) {
      return Response.json({ error: "db_failed", detail: String(e) }, { headers: CORS });
    }

    if (!subs.length) return Response.json({ sent: 0, reason: "no_subscriptions" }, { headers: CORS });

    const notifPayload = JSON.stringify({ type: "amira-alert", title, body, url: "/panel/" });
    console.log(`[notify-amira] Sending to ${subs.length} subscriptions. title="${title}"`);
    const results = await Promise.all(
      subs.map(async (s, i) => {
        try {
          const r = await sendPush(s.endpoint, s.p256dh, s.auth, notifPayload);
          console.log(`[notify-amira] device=${i} status=${r.status} ok=${r.ok} body=${r.body.slice(0,80)}`);
          // Auto-cleanup: endpoint expirado o inválido — borrar para que se re-registre solo
          if (r.status === 410 || r.status === 404) {
            await dbDelete(`amira_push_subscriptions?endpoint=eq.${encodeURIComponent(s.endpoint)}`).catch(() => {});
          }
          return { device: i, ...r };
        } catch (e) {
          console.log(`[notify-amira] device=${i} error=${String(e)}`);
          return { device: i, ok: false, status: 0, body: String(e) };
        }
      })
    );

    const summary = { sent: results.filter(r => r.ok).length, total: subs.length, results };
    console.log(`[notify-amira] Done: sent=${summary.sent}/${summary.total}`);
    return Response.json(summary, { headers: CORS });

  } catch (e) {
    return Response.json({ fatal: String(e), stack: e instanceof Error ? e.stack : undefined }, { headers: CORS });
  }
});

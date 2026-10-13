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

// La API devuelve de a 1000 filas: pedir por paginas hasta traer todo.
async function dbFetchAll(path: string): Promise<unknown[]> {
  const out: unknown[] = [];
  for (let off = 0; ; off += 1000) {
    const page = await dbFetch(`${path}&limit=1000&offset=${off}`) as unknown[];
    out.push(...page);
    if (page.length < 1000) return out;
  }
}

// ── Las mismas reglas que "Hoy hay que atender" en el Inicio del panel ──────
// Hasta el 13/10 el resumen usaba umbrales propios (4 dias sin entrenar, 21 dias
// para una nueva, cualquier reporte de dolor de la semana) y decia otra cosa que
// la pantalla. Si se cambia una regla en el panel (rInicio), cambiarla aca.
const SEGUIMIENTO_DOLOR_DESDE = "2026-10-01";
const DIAS_ESPERA_CONTACTO = 3;
// Las primeras dos semanas de cada alumna las sigue la tarjeta "Primeras dos
// semanas" de Inicio, no "Hoy hay que atender" (igual que el panel, 13/10/2026).
const DIAS_ARRANQUE = 14;
const AR = -3 * 3600000; // Argentina, sin horario de verano: dias de calendario como en el panel

function diaAR(t: number): number { return Math.floor((t + AR) / 86400000); }
function localDayDiff(iso: string | null | undefined, ahora: number): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  return isNaN(t) ? null : diaAR(ahora) - diaAR(t);
}

type Alumna = { id: number; estado?: string | null; last_active_at?: string | null; created_at?: string | null; dias?: number | string | null };
type Hecho = { alumna_id: number; ciclo: number; semana: number; dia: number };
type Dolor = { alumna_id: number; tipo: string; atendido_at?: string | null; created_at?: string | null };
type Contacto = { alumna_id: number; created_at: string };

export function calcularResumen(alumnas: Alumna[], hechos: Hecho[], dolores: Dolor[], contactos: Contacto[], ahora = Date.now()) {
  const activas = alumnas.filter(a => !a.estado || a.estado === "activa");
  const entrenaron = activas.filter(a => { const d = localDayDiff(a.last_active_at, ahora); return d !== null && d < 7; }).length;

  // Un dolor queda hasta que Amira lo marca como atendido, aunque ya le haya escrito.
  const atender = new Set<number>();
  const conDolor = new Set<number>();
  for (const f of dolores) {
    if (f.tipo !== "dolor_preocupante" || f.atendido_at || String(f.created_at || "") < SEGUIMIENTO_DOLOR_DESDE) continue;
    if (!alumnas.some(a => a.id === f.alumna_id)) continue;
    atender.add(f.alumna_id); conDolor.add(f.alumna_id);
  }

  const diasHechos = new Map<number, Set<string>>();
  for (const h of hechos) {
    if (!diasHechos.has(h.alumna_id)) diasHechos.set(h.alumna_id, new Set());
    diasHechos.get(h.alumna_id)!.add(`${h.ciclo}-${h.semana}-${h.dia}`);
  }
  const ultimoContacto = new Map<number, string>();
  for (const c of contactos) {
    const prev = ultimoContacto.get(c.alumna_id);
    if (!prev || c.created_at > prev) ultimoContacto.set(c.alumna_id, c.created_at);
  }

  const enArranque = (a: Alumna) => { const d = localDayDiff(a.created_at, ahora); return d !== null && d < DIAS_ARRANQUE; };
  const arrancando = activas.filter(enArranque).length;
  let esperando = 0;
  for (const a of activas) {
    if (atender.has(a.id)) continue;
    if (enArranque(a)) continue;
    const ds = localDayDiff(a.last_active_at, ahora);
    const daysSince = ds === null ? null : Math.max(0, ds);
    const memberDays = a.created_at ? Math.max(0, localDayDiff(a.created_at, ahora) ?? 0) : 0;
    const freq = parseInt(String(a.dias)) || 3;
    const totalTrained = diasHechos.get(a.id)?.size ?? 0;
    const expectedTotal = Math.max(1, Math.floor(memberDays / 7)) * freq;
    const adherencia = Math.min(1, totalTrained / expectedTotal);
    const alerta = daysSince === null
      || (memberDays <= 21 && daysSince >= 5)
      || (memberDays > 14 && adherencia < 0.35 && daysSince >= 3)
      || daysSince >= 7
      || (memberDays > 14 && totalTrained > 0 && adherencia < 0.55 && daysSince >= 4);
    if (!alerta) continue;
    // A la que Amira le escribio hace menos de DIAS_ESPERA_CONTACTO dias se la espera.
    const dc = localDayDiff(ultimoContacto.get(a.id), ahora);
    if (dc !== null && Math.max(0, dc) < DIAS_ESPERA_CONTACTO) esperando++;
    else atender.add(a.id);
  }
  return { total: activas.length, entrenaron, necesitanAtencion: atender.size, dolorSinAtender: conDolor.size, esperando, arrancando };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });

  const apikey = req.headers.get("apikey") ?? req.headers.get("x-api-key") ?? "";
  if (!apikey) return new Response("Unauthorized", { status: 401, headers: CORS });

  try {
    // ── Cómputo de stats ─────────────────────────────────────────
    const hace90 = encodeURIComponent(new Date(Date.now() - 90 * 86400000).toISOString());
    const [alumnas, hechos, dolores, contactos] = await Promise.all([
      dbFetch("alumnas?select=id,estado,last_active_at,created_at,dias") as Promise<Alumna[]>,
      dbFetchAll("progreso?select=alumna_id,ciclo,semana,dia&hecho=eq.true&order=id.asc") as Promise<Hecho[]>,
      dbFetchAll(`feedbacks?select=alumna_id,tipo,atendido_at,created_at&tipo=eq.dolor_preocupante&atendido_at=is.null&order=id.asc`) as Promise<Dolor[]>,
      dbFetchAll(`contactos?select=alumna_id,created_at&created_at=gte.${hace90}&order=id.asc`) as Promise<Contacto[]>,
    ]);
    const { total, entrenaron, necesitanAtencion, dolorSinAtender, esperando, arrancando } = calcularResumen(alumnas, hechos, dolores, contactos);

    // ── Composición del mensaje ──────────────────────────────────
    const title = "📊 Resumen de la semana";
    const partes: string[] = [];
    partes.push(`${entrenaron} de ${total} alumnas entrenaron esta semana`);
    if (necesitanAtencion > 0) partes.push(`${necesitanAtencion} para atender en Inicio`);
    if (dolorSinAtender > 0) partes.push(`${dolorSinAtender} con dolor sin atender`);
    if (esperando > 0) partes.push(`${esperando} esperando respuesta`);
    if (arrancando > 0) partes.push(`${arrancando} en sus primeras dos semanas`);
    const body = partes.join(" · ");
    const stats = { total, entrenaron, necesitanAtencion, dolorSinAtender, esperando, arrancando };

    // ── Envío ────────────────────────────────────────────────────
    let subs: Array<{ endpoint: string; p256dh: string; auth: string }> = [];
    try {
      subs = await dbFetch("amira_push_subscriptions?select=endpoint,p256dh,auth") as typeof subs;
    } catch (e) {
      return Response.json({ error: "db_failed", detail: String(e) }, { headers: CORS });
    }

    if (!subs.length) {
      return Response.json({ sent: 0, total: 0, reason: "no_subscriptions", stats }, { headers: CORS });
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
      stats,
      title,
      body,
      results
    }, { headers: CORS });

  } catch (e) {
    return Response.json({ error: String(e), stack: e instanceof Error ? e.stack : undefined }, { headers: CORS });
  }
});

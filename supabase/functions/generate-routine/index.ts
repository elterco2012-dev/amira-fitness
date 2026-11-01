// Genera una rutina de entrenamiento para una alumna usando Claude AI.
// Lee el perfil de la alumna, historial de progreso y biblioteca de ejercicios.
// Devuelve JSON estructurado listo para guardar en la tabla rutinas.

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY") ?? "";
const SB_URL            = Deno.env.get("SUPABASE_URL") ?? "";
const SB_SVC            = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const SB_ANON           = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
};

// ── Quién llama ──────────────────────────────────────────────────────────────
// Hasta el 14/10/2026 las funciones solo miraban que llegara un encabezado apikey,
// con cualquier valor, y send-push y notify-amira ni eso: cualquiera podía mandarles
// notificaciones a todas las alumnas o a Amira, o hacer correr la IA a costa de Amira.
// Ahora cuenta quién es: la clave de servicio (pg_cron y los avisos de la base),
// la sesión de Amira o la de una alumna (por su email en alumnas). Misma comprobación
// que update-auth-email; está repetida en cada función porque se despliegan por separado.
type Quien = { tipo: "servicio" } | { tipo: "amira" } | { tipo: "alumna"; alumnaId: number };
async function quienLlama(req: Request): Promise<Quien | null> {
  const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  if (SB_SVC && token === SB_SVC) return { tipo: "servicio" };
  const r = await fetch(`${SB_URL}/auth/v1/user`, { headers: { apikey: SB_ANON, Authorization: `Bearer ${token}` } }).catch(() => null);
  if (r?.ok) {
    const email = String((await r.json().catch(() => ({})))?.email ?? "").toLowerCase();
    if (!email) return null;
    if (email === "amiralezcano@gmail.com") return { tipo: "amira" };
    const filas = await fetch(`${SB_URL}/rest/v1/alumnas?select=id&email=eq.${encodeURIComponent(email)}&limit=1`,
      { headers: { apikey: SB_SVC, Authorization: `Bearer ${SB_SVC}` } }).then(x => x.ok ? x.json() : []).catch(() => []);
    return filas?.[0]?.id ? { tipo: "alumna", alumnaId: filas[0].id } : null;
  }
  // La clave de servicio vieja, la que tienen pg_cron y los avisos de la base: solo una clave
  // de servicio puede leer la lista de usuarios. Va como credencial, con la clave del entorno
  // en apikey: desde el 18/4/2026 Supabase rechaza las claves viejas en ese encabezado.
  const adm = await fetch(`${SB_URL}/auth/v1/admin/users?page=1&per_page=1`,
    { headers: { apikey: SB_ANON, Authorization: `Bearer ${token}` } }).catch(() => null);
  return adm?.ok ? { tipo: "servicio" } : null;
}
const NO_AUTORIZADO = () => new Response("Unauthorized", { status: 401, headers: CORS });

async function dbFetch(path: string): Promise<unknown> {
  for (const key of [SB_SVC, SB_ANON]) {
    if (!key) continue;
    const r = await fetch(`${SB_URL}/rest/v1/${path}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" }
    });
    if (r.ok) return r.json();
    if (key === SB_ANON) throw new Error(`DB ${r.status}: ${await r.text()}`);
  }
  throw new Error("No DB key available");
}

// ── Tiempo: Supabase corta la función a los 150 s (plan gratuito) ────────────
// El 31/10/2026 una rutina de 3 días tardaba entre 122 y 133 s y una de 4 días 143 s.
// La de una alumna de 4 días pasó el límite: Supabase la cortó a los 150 s, Claude
// trabajó igual y el panel no recibió nada claro. Por eso la respuesta va en una sola
// línea y sin repetir datos (ver FORMATO DE RESPUESTA), y la función corta antes y lo dice.
const LIMITE_MS = 145_000;
const TARDE = "La IA tardó más de 2 minutos y medio y el servidor la cortó antes de terminar: no se generó nada. Probá de nuevo en un rato; si vuelve a pasar, generá de a una semana.";
async function pedirAClaude(cuerpo: unknown, inicio: number, extra: Record<string, string> = {}):
  Promise<{ ok: boolean; status: number; texto: string } | null> {
  const ctrl = new AbortController();
  const reloj = setTimeout(() => ctrl.abort(), Math.max(1_000, LIMITE_MS - (Date.now() - inicio)));
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", ...extra },
      body: JSON.stringify(cuerpo),
      signal: ctrl.signal,
    });
    return { ok: r.ok, status: r.status, texto: await r.text() };
  } catch (e) {
    if (ctrl.signal.aborted) { console.log(`[generate-routine] cortada por tiempo a los ${Date.now() - inicio} ms`); return null; }
    throw e;
  } finally {
    clearTimeout(reloj);
  }
}

// ── Corregir solo los ejercicios que marcó la revisión (1/11/2026) ───────────
// La revisión del panel marca los ejercicios que no le sirven a la alumna: le falta el
// equipamiento o el banco, están repetidos en el día, son de alto impacto para su nivel
// o no están en la biblioteca. Hasta ese día la única salida era regenerar todo: la
// rutina de una alumna que entrena en casa con mancuernas salió con 13 errores en 4
// ejercicios (press y remo en banco, hip thrust con barra, flexiones con los pies en un
// step), y regenerar rehacía también los otros 120 lugares, con el riesgo de errores
// nuevos. Ahora el panel manda solo esos ejercicios, cada uno con los reemplazos que
// permite la biblioteca, y la IA elige uno por ejercicio mirando sus lesiones y lo que ya
// tiene ese día. Lo demás queda igual. En un día sin jale (o sin empuje), el panel manda
// uno del tren superior para cambiar, con candidatos de ese movimiento (también 1/11/2026).
// La lista de candidatos la vuelve a filtrar esta función: la IA solo puede elegir uno con
// técnica cargada, que la alumna pueda hacer con lo que tiene y de bajo o medio impacto.
const MODELO_CORREGIR = "claude-opus-5-5";
const MAX_GRUPOS = 20, MAX_CANDIDATOS = 15, MAX_DIAS = 40, MAX_EJ_DIA = 20;
const SIN_CANDIDATOS = "No hay en la biblioteca otro ejercicio parecido que pueda hacer con lo que tiene.";

type BibCorr = {
  nombre: string; grupo_muscular?: string | null; descripcion?: string | null; observaciones?: string | null;
  equipamiento_requerido?: string | null; patron_movimiento?: string | null; nivel_dificultad?: number | null;
  posicion_ejercicio?: string | null; bilateral?: boolean | null; impacto?: string | null; requiere_banco?: boolean | null;
};
type GrupoCorr = { id: string; actual: string; motivo: string; dias: string[]; candidatos: string[] };
type DiaCorr = { id: string; semana: number; dia: number; enfoque: string; ejercicios: string[] };
type Reemplazo = { id: string; nombre: string; tip: string; por_que: string };
type PerfilCorr = {
  nombre?: string; tipo?: string | null; nivel?: string | null; objetivo?: string | null; equipamiento?: string[] | null;
  lesiones?: string | null; notas?: string | null; foco_muscular?: string | null;
};

const texto = (v: unknown, max: number) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
// Los nombres de ejercicio van tal cual: se comparan con los de la biblioteca.
const nombreEj = (v: unknown) => String(v ?? "").slice(0, 120);

// Lo que manda el panel, recortado a lo esperado: lo demás se descarta.
function leerPedidoCorregir(entrada: unknown): { dias: DiaCorr[]; grupos: GrupoCorr[] } {
  const e = (entrada ?? {}) as { dias?: unknown; grupos?: unknown };
  const dias: DiaCorr[] = (Array.isArray(e.dias) ? e.dias : []).slice(0, MAX_DIAS).map((d) => {
    const x = (d ?? {}) as Record<string, unknown>;
    return {
      id: texto(x.id, 12), semana: Number(x.semana) || 0, dia: Number(x.dia) || 0, enfoque: texto(x.enfoque, 120),
      ejercicios: (Array.isArray(x.ejercicios) ? x.ejercicios : []).slice(0, MAX_EJ_DIA).map(nombreEj),
    };
  }).filter((d) => /^S\d{1,2}D\d{1,2}$/.test(d.id));
  const idsDias = new Set(dias.map((d) => d.id));
  const grupos: GrupoCorr[] = (Array.isArray(e.grupos) ? e.grupos : []).slice(0, MAX_GRUPOS).map((g) => {
    const x = (g ?? {}) as Record<string, unknown>;
    return {
      id: texto(x.id, 8), actual: nombreEj(x.actual), motivo: texto(x.motivo, 300),
      dias: (Array.isArray(x.dias) ? x.dias : []).map((d) => texto(d, 12)).filter((d) => idsDias.has(d)),
      candidatos: [...new Set((Array.isArray(x.candidatos) ? x.candidatos : []).map(nombreEj).filter(Boolean))].slice(0, MAX_CANDIDATOS),
    };
  }).filter((g) => /^g\d{1,3}$/.test(g.id) && g.actual);
  return { dias, grupos };
}

// Los mismos límites que la generación: equipamiento y banco que tiene (en el gimnasio,
// todo), nada N3 para una principiante, y además nunca alto impacto: un reemplazo no
// tiene que sumar saltos. Sin técnica cargada no se receta (la alumna vería "Ver técnica"
// vacío), y los calentamientos, estiramientos y los que no tienen patrón ("Descanso",
// "Movilidad articular") no son ejercicios de trabajo.
function puedeHacerlo(ex: BibCorr | undefined, alumna: PerfilCorr): ex is BibCorr {
  if (!ex || !(ex.descripcion ?? "").trim() || !ex.patron_movimiento) return false;
  if (["calentamiento", "estiramiento"].includes((ex.grupo_muscular ?? "").toLowerCase())) return false;
  if (ex.impacto === "alto") return false;
  const nivel = (alumna.nivel ?? "").toLowerCase();
  if (nivel === "principiante" && Number(ex.nivel_dificultad) === 3) return false;
  const tipo = (alumna.tipo ?? "").toLowerCase();
  if (["gym", "gimnasio", "musculacion", "musculación"].includes(tipo)) return true;
  const tiene = new Set(alumna.equipamiento ?? []);
  const eq = ex.equipamiento_requerido ?? "sin_equipamiento";
  if (eq !== "sin_equipamiento" && !tiene.has(eq)) return false;
  if (ex.requiere_banco && !tiene.has("banco")) return false;
  return true;
}

function promptsCorregir(alumna: PerfilCorr, dias: DiaCorr[], grupos: GrupoCorr[], porNombre: Map<string, BibCorr>) {
  const system = `Sos una entrenadora personal experta en fitness femenino. Te paso una rutina ya planificada en la que algunos ejercicios no le sirven a la alumna: le falta el equipamiento o el banco, están repetidos en el mismo día, son de alto impacto para su nivel o no están en la biblioteca. También puede faltarle a un día un jale (remo o jalón) o un empuje (press): entonces sale un ejercicio del tren superior de ese día para que entre uno de ese movimiento. Cada grupo es un ejercicio que sale, con los días en que aparece y la lista de candidatos que sí puede hacer. Para cada grupo elegí UN reemplazo de su lista.

Cómo elegir:
- Que dé el mismo estímulo: el mismo músculo principal y, si se puede, el mismo movimiento (un press de pecho por otro press de pecho, un hip thrust por un puente de glúteos).
- Si el motivo dice que al día le falta un jale o un empuje, el reemplazo es de ese movimiento y no del músculo que sale: los candidatos ya lo son. Elegí el que mejor complete ese día.
- Que sea seguro con sus lesiones y limitaciones. Si un candidato está desaconsejado para lo que tiene, descartalo. Si ninguno es seguro, devolvé el nombre vacío y explicá por qué.
- Que no repita un ejercicio que ya está ese día. Si dos grupos caen el mismo día, elegí un ejercicio distinto para cada uno.
- Si se puede, uno que no haga ya otro día de esa semana (están marcados), para que la rutina no se vuelva repetitiva.
- Que respete su nivel. El mismo reemplazo va en todas las semanas del grupo: elegí uno que sirva para el ciclo entero.
- Copiá el nombre exactamente como figura en la lista.

Para cada grupo devolvé:
- nombre: el candidato elegido, o "" si ninguno es seguro.
- tip: un consejo técnico corto para la alumna sobre el ejercicio elegido, de hasta 80 caracteres, hablándole de vos. Vacío si no elegiste ninguno.
- por_que: para la entrenadora, una oración de hasta 120 caracteres con el motivo de la elección.`;

  const equipo = (alumna.equipamiento ?? []).length ? (alumna.equipamiento ?? []).join(", ") : "ninguno";
  const describir = (n: string, enSemana: Set<string>) => {
    const ex = porNombre.get(n);
    if (!ex) return `- ${n}`;
    const marcas = [ex.grupo_muscular, ex.patron_movimiento?.replace(/_/g, " "), ex.nivel_dificultad ? `N${ex.nivel_dificultad}` : "",
      ex.posicion_ejercicio?.replace(/_/g, " "), ex.bilateral === false ? "unilateral" : "", ex.impacto ? `${ex.impacto} impacto` : "",
      (ex.equipamiento_requerido ?? "sin_equipamiento").replace(/_/g, " ")].filter(Boolean).map((m) => `[${m}]`).join("");
    const obs = ex.observaciones ? ` ⚠️ ${texto(ex.observaciones, 80)}` : "";
    const yaEsta = enSemana.has(n) ? " (ya lo hace otro día de esa semana)" : "";
    return `- ${n} ${marcas}${yaEsta} — ${texto(ex.descripcion, 110)}${obs}`;
  };
  // Lo que hace los otros días de las mismas semanas del grupo.
  const otrosDiasDeLaSemana = (g: GrupoCorr) => {
    const semanas = new Set(dias.filter((d) => g.dias.includes(d.id)).map((d) => d.semana));
    return new Set(dias.filter((d) => semanas.has(d.semana) && !g.dias.includes(d.id)).flatMap((d) => d.ejercicios));
  };
  const diasUsados = new Set(grupos.flatMap((g) => g.dias));
  const user = `ALUMNA
- Modalidad: ${alumna.tipo || "no especificada"}
- Nivel: ${alumna.nivel || "no especificado"}
- Objetivo: ${alumna.objetivo || "no especificado"}
- Equipamiento que tiene, además de su peso corporal: ${equipo}
- Foco muscular: ${alumna.foco_muscular || "sin foco especial"}
- Lesiones o limitaciones: ${(alumna.lesiones ?? "").trim() || "ninguna"}
- Notas de la entrenadora: ${(alumna.notas ?? "").trim() || "ninguna"}

LO QUE YA TIENE CADA DÍA
${dias.filter((d) => diasUsados.has(d.id)).map((d) => `${d.id} (semana ${d.semana}, día ${d.dia}${d.enfoque ? `, ${d.enfoque}` : ""}): ${d.ejercicios.join(" | ")}`).join("\n")}

GRUPOS
${grupos.map((g) => {
    const ref = porNombre.get(g.actual);
    const datos = ref ? ` (${[ref.grupo_muscular, ref.patron_movimiento?.replace(/_/g, " ")].filter(Boolean).join(", ")})` : "";
    const enSemana = otrosDiasDeLaSemana(g);
    return `${g.id}: sale «${g.actual}»${datos} porque ${g.motivo}. Aparece en ${g.dias.join(", ")}.\nCandidatos:\n${g.candidatos.map((n) => describir(n, enSemana)).join("\n")}`;
  }).join("\n\n")}`;
  return { system, user };
}

// Un objeto por grupo, con el nombre limitado a sus candidatos: la respuesta no puede
// traer un ejercicio que no esté en la lista (o "" si ninguno es seguro).
function esquemaCorregir(grupos: GrupoCorr[]) {
  return {
    type: "object",
    properties: Object.fromEntries(grupos.map((g) => [g.id, {
      type: "object",
      properties: {
        nombre: { type: "string", enum: [...g.candidatos, ""] },
        tip: { type: "string" },
        por_que: { type: "string" },
      },
      required: ["nombre", "tip", "por_que"],
      additionalProperties: false,
    }])),
    required: grupos.map((g) => g.id),
    additionalProperties: false,
  };
}

async function corregirRutina(alumnaId: number, entrada: unknown, inicio: number): Promise<Response> {
  const { dias, grupos } = leerPedidoCorregir(entrada);
  if (!grupos.length) return Response.json({ error: "No llegó ningún ejercicio para corregir" }, { status: 400, headers: CORS });

  const [alumnas, biblioteca] = await Promise.all([
    dbFetch(`alumnas?id=eq.${alumnaId}&select=nombre,tipo,nivel,objetivo,equipamiento,lesiones,notas,foco_muscular`),
    dbFetch("ejercicios_biblioteca?select=nombre,grupo_muscular,descripcion,equipamiento_requerido,patron_movimiento,nivel_dificultad,observaciones,posicion_ejercicio,bilateral,impacto,requiere_banco"),
  ]) as [PerfilCorr[], BibCorr[]];
  if (!alumnas.length) return Response.json({ error: "Alumna no encontrada" }, { status: 404, headers: CORS });
  const alumna = alumnas[0];
  // Hay nombres repetidos en la biblioteca: vale la fila que tiene técnica.
  const porNombre = new Map<string, BibCorr>();
  for (const ex of biblioteca) {
    const prev = porNombre.get(ex.nombre);
    if (!prev || (!(prev.descripcion ?? "").trim() && (ex.descripcion ?? "").trim())) porNombre.set(ex.nombre, ex);
  }

  const reemplazos: Reemplazo[] = [];
  const paraIA: GrupoCorr[] = [];
  for (const g of grupos) {
    const candidatos = g.candidatos.filter((n) => n !== g.actual && puedeHacerlo(porNombre.get(n), alumna));
    if (candidatos.length) paraIA.push({ ...g, candidatos });
    else reemplazos.push({ id: g.id, nombre: "", tip: "", por_que: SIN_CANDIDATOS });
  }
  if (!paraIA.length) return Response.json({ reemplazos }, { headers: CORS });

  const { system, user } = promptsCorregir(alumna, dias, paraIA, porNombre);
  const r = await pedirAClaude({
    model: MODELO_CORREGIR,
    max_tokens: 16000,
    // Piensa siempre; medium alcanza para elegir entre pocos candidatos mirando las lesiones.
    output_config: { effort: "medium", format: { type: "json_schema", schema: esquemaCorregir(paraIA) } },
    system,
    messages: [{ role: "user", content: user }],
  }, inicio);
  if (!r) return Response.json({ error: TARDE }, { status: 504, headers: CORS });
  if (!r.ok) {
    console.log(`[generate-routine] corregir: Claude ${r.status} ${r.texto.slice(0, 300)}`);
    return Response.json({ error: `Claude API error ${r.status}`, detail: r.texto.slice(0, 500) }, { status: 502, headers: CORS });
  }
  const data = JSON.parse(r.texto) as {
    content?: Array<{ type: string; text?: string }>; stop_reason?: string;
    usage?: { input_tokens?: number; output_tokens?: number };
  };
  console.log(`[generate-routine] corregir: grupos=${paraIA.length} in=${data.usage?.input_tokens} out=${data.usage?.output_tokens} stop=${data.stop_reason} ms=${Date.now() - inicio}`);
  if (data.stop_reason === "refusal") return Response.json({ error: "La IA no quiso responder este pedido" }, { status: 502, headers: CORS });
  if (data.stop_reason === "max_tokens") return Response.json({ error: "La respuesta de la IA quedó cortada" }, { status: 502, headers: CORS });
  let elegidos: Record<string, { nombre?: unknown; tip?: unknown; por_que?: unknown }> = {};
  try {
    elegidos = JSON.parse((data.content ?? []).filter((b) => b.type === "text").map((b) => b.text ?? "").join(""));
  } catch {
    return Response.json({ error: "La IA no devolvió una respuesta legible" }, { status: 502, headers: CORS });
  }
  for (const g of paraIA) {
    const e = elegidos?.[g.id] ?? {};
    const nombre = nombreEj(e.nombre);
    if (nombre && g.candidatos.includes(nombre)) {
      reemplazos.push({ id: g.id, nombre, tip: texto(e.tip, 80), por_que: texto(e.por_que, 160) });
    } else {
      reemplazos.push({ id: g.id, nombre: "", tip: "", por_que: texto(e.por_que, 160) || "La IA no eligió ninguno de la lista." });
    }
  }
  return Response.json({ reemplazos, usage: data.usage }, { headers: CORS });
}

Deno.serve(async (req) => {
  const inicio = Date.now();
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });

  // Solo Amira: cada llamada usa Claude a su costo y lee los datos de la alumna.
  if ((await quienLlama(req))?.tipo !== "amira") return NO_AUTORIZADO();

  if (!ANTHROPIC_API_KEY) {
    return Response.json({ error: "ANTHROPIC_API_KEY no configurada en los secrets del proyecto" }, { status: 500, headers: CORS });
  }

  let body: { alumna_id?: number; semanas?: number; instrucciones?: string; corregir?: unknown };
  try { body = await req.json(); } catch { return Response.json({ error: "JSON inválido" }, { status: 400, headers: CORS }); }

  const { alumna_id, semanas = 4, instrucciones } = body;
  if (!alumna_id) return Response.json({ error: "alumna_id requerido" }, { status: 400, headers: CORS });

  // Corregir: solo los ejercicios que la revisión del panel marcó (ver corregirRutina).
  if (body.corregir) {
    const id = Number(alumna_id);
    if (!Number.isInteger(id) || id <= 0) return Response.json({ error: "alumna_id inválido" }, { status: 400, headers: CORS });
    try { return await corregirRutina(id, body.corregir, inicio); }
    catch (e) { return Response.json({ error: String(e) }, { status: 500, headers: CORS }); }
  }

  try {
    // ── 1. Recolectar contexto de la alumna ──────────────────────
    const [alumnas, biblioteca, rutinas, progreso, feedbacks] = await Promise.all([
      dbFetch(`alumnas?id=eq.${alumna_id}&select=id,nombre,tipo,dias,lesiones,notas,objetivo,equipamiento,tiempo_sesion,ciclo_actual,nivel,split,dias_disponibles,foco_muscular,adaptar_ciclo_menstrual,estilo_sesion`),
      dbFetch("ejercicios_biblioteca?select=nombre,grupo_muscular,descripcion,equipamiento_requerido,patron_movimiento,nivel_dificultad,observaciones,posicion_ejercicio,bilateral,impacto,requiere_banco&order=grupo_muscular.asc,nombre.asc"),
      dbFetch(`rutinas?alumna_id=eq.${alumna_id}&order=ciclo.desc,semana.asc,dia.asc&limit=100`),
      dbFetch(`progreso?alumna_id=eq.${alumna_id}&hecho=eq.true&select=ciclo,semana,dia,ejercicio_nombre,ejercicio_idx,peso_kg,rpe&order=ciclo.desc,semana.desc&limit=200`),
      dbFetch(`feedbacks?alumna_id=eq.${alumna_id}&select=tipo,nota,created_at&order=created_at.desc&limit=20`),
    ]) as [unknown[], unknown[], unknown[], unknown[], unknown[]];

    if (!alumnas.length) return Response.json({ error: "Alumna no encontrada" }, { status: 404, headers: CORS });
    const alumna = alumnas[0] as {
      nombre: string; tipo?: string; dias?: number; lesiones?: string | null; notas?: string | null;
      objetivo?: string | null; equipamiento?: string[] | null; tiempo_sesion?: number | null;
      ciclo_actual?: number; nivel?: string | null; split?: string | null;
      dias_disponibles?: string[] | null; foco_muscular?: string | null;
      adaptar_ciclo_menstrual?: boolean; estilo_sesion?: string | null;
    };

    // ── 2. Ciclo anterior: estructura de días ────────────────────
    const cicloActual = alumna.ciclo_actual ?? 1;
    const cicloAnterior = cicloActual >= 1 ? cicloActual : 0;
    const rutinasAnterior = (rutinas as Array<{ ciclo: number; semana: number; dia: number; ejercicios: unknown[] }>)
      .filter(r => r.ciclo === cicloAnterior)
      .sort((a, b) => a.semana - b.semana || a.dia - b.dia);

    // ── 2b. Desgaste: qué viene repitiendo hace muchos ciclos ────
    // El modelo recibe la rutina anterior como contexto y tiende a copiarla.
    // Medido sobre una alumna de 6 ciclos: 20 ejercicios aparecian en los 6, y
    // la novedad por ciclo cayo de 38% a 4%. La mitad de la biblioteca que su
    // equipamiento permite nunca le toco. No falta biblioteca: falta rotacion.
    const ciclosPorEj: Record<string, Set<number>> = {};
    for (const r of rutinas as Array<{ ciclo: number; ejercicios: unknown[] }>) {
      for (const e of (r.ejercicios ?? [])) {
        const nom = (e as { nombre?: string })?.nombre;
        if (!nom) continue;
        (ciclosPorEj[nom] ??= new Set()).add(r.ciclo);
      }
    }
    const ciclosVistos = new Set((rutinas as Array<{ ciclo: number }>).map(r => r.ciclo)).size;
    const repetidos = Object.entries(ciclosPorEj)
      .map(([nom, cs]) => ({ nom, n: cs.size }))
      .filter(x => x.n >= 3)
      .sort((a, b) => b.n - a.n)
      .slice(0, 20);
    const desgasteStr = repetidos.length
      ? repetidos.map(x => `- ${x.nom} (en ${x.n} de los últimos ${ciclosVistos} ciclos)`).join("\n")
      : "Ninguno todavía: es una alumna nueva o lleva pocos ciclos.";
    // Nombres que la biblioteca tiene y esta alumna nunca hizo. El filtro de
    // equipamiento y nivel lo sigue aplicando el modelo con las reglas de abajo.
    // Mismo filtro de tecnica que la biblioteca de abajo: si no se los puede
    // recetar, tampoco hay que ofrecerlos como alternativa fresca.
    const nuncaUsados = (biblioteca as Array<{ nombre: string; descripcion?: string }>)
      .filter(ex => !ciclosPorEj[ex.nombre] && (ex.descripcion ?? "").trim() !== "")
      .map(ex => ex.nombre);
    const frescosStr = nuncaUsados.length
      ? nuncaUsados.slice(0, 60).join(", ")
      : "Ninguno: ya hizo toda la biblioteca compatible.";

    // ── 3. Historial de pesos y RPE (últimas 3 sesiones por ejercicio → tendencia)
    type ProgresoRow = { ejercicio_nombre?: string; peso_kg?: number | null; rpe?: number | null; semana: number; ciclo: number };
    const sessionsByEx: Record<string, Array<{ kg: number; rpe: number | null }>> = {};
    for (const p of progreso as ProgresoRow[]) {
      const nom = p.ejercicio_nombre;
      if (!nom) continue;
      if (!sessionsByEx[nom]) sessionsByEx[nom] = [];
      if (sessionsByEx[nom].length < 3) sessionsByEx[nom].push({ kg: p.peso_kg ?? 0, rpe: p.rpe ?? null });
    }

    // ── 4. Feedbacks recientes relevantes ────────────────────────
    type Feedback = { tipo: string; nota?: string; created_at: string };
    const fbResumen = (feedbacks as Feedback[])
      .filter(f => ["dolor_preocupante", "dolor_articular", "muy_cansada", "rpe"].includes(f.tipo))
      .slice(0, 8)
      .map(f => `- ${f.tipo}${f.nota ? ": " + f.nota : ""} (${f.created_at.slice(0, 10)})`)
      .join("\n");

    // ── 5. Biblioteca con patrón y nivel ─────────────────────────
    type BibRow = {
      nombre: string; grupo_muscular?: string; descripcion?: string; observaciones?: string | null;
      equipamiento_requerido?: string; patron_movimiento?: string | null; nivel_dificultad?: number | null;
      posicion_ejercicio?: string | null; bilateral?: boolean | null; impacto?: string | null;
      requiere_banco?: boolean | null;
    };
    // Cada etiqueta tiene que ser igual a la de EQUIP_TO_TAG (más abajo): la IA compara la
    // del ejercicio con las PERMITIDAS y PROHIBIDAS. Hasta el 1/11/2026 la ruedita salía como
    // [ruedita] y la prohibida era [ruedita abdominal].
    const equipLabels: Record<string, string> = {
      sin_equipamiento: "sin equipamiento", mancuernas: "mancuernas", barra: "barra",
      maquina: "máquina", banda_elastica: "banda elástica", kettlebell: "pesa rusa",
      polea: "polea/cables", trx: "TRX", fitball: "esfera", step: "step/cajón",
      ruedita: "ruedita abdominal", tobillera: "tobillera", soga: "soga"
    };
    // Un ejercicio sin tecnica cargada no se le puede dar a nadie: la alumna
    // abriria la tarjeta y encontraria el boton "Ver tecnica" vacio. Amira carga
    // los ejercicios nuevos primero y les escribe la tecnica despues, asi que
    // hasta que la tenga quedan fuera de la biblioteca que ve el modelo.
    const bibUsable = (biblioteca as BibRow[]).filter(ex => (ex.descripcion ?? "").trim() !== "");
    const bibByGroup: Record<string, string[]> = {};
    for (const ex of bibUsable) {
      const g = ex.grupo_muscular ?? "Otros";
      if (!bibByGroup[g]) bibByGroup[g] = [];
      const equip = ex.equipamiento_requerido ? `[${equipLabels[ex.equipamiento_requerido] ?? ex.equipamiento_requerido}]` : "[sin equipamiento]";
      const patron = ex.patron_movimiento ? `[${ex.patron_movimiento}]` : "";
      const nivel  = ex.nivel_dificultad   ? `[N${ex.nivel_dificultad}]` : "";
      const pos    = ex.posicion_ejercicio  ? `[${ex.posicion_ejercicio.replace(/_/g," ")}]` : "";
      const uni    = ex.bilateral === false  ? "[unilateral]" : "";
      const imp    = ex.impacto             ? `[${ex.impacto} impacto]` : "";
      const banco  = ex.requiere_banco       ? "[necesita banco]" : "";
      const obs    = ex.observaciones      ? ` ⚠️ ${ex.observaciones.slice(0, 80)}` : "";
      bibByGroup[g].push(`- ${ex.nombre} ${equip}${patron}${nivel}${pos}${uni}${imp}${banco}${ex.descripcion ? ` — ${ex.descripcion.slice(0, 50)}` : ""}${obs}`);
    }
    const bibTexto = Object.entries(bibByGroup)
      .map(([g, exs]) => `### ${g}\n${exs.join("\n")}`)
      .join("\n\n");

    // ── 6. System prompt (parte cacheada) ───────────────────────
    const systemPrompt = `Sos una entrenadora personal experta en fitness femenino. \
Tu tarea es generar rutinas de entrenamiento progresivas, seguras y efectivas \
basadas en el perfil de la alumna y el historial de entrenamiento disponible.

REGLAS GENERALES:
- Usá SOLO ejercicios de la biblioteca proporcionada. Los nombres deben coincidir EXACTAMENTE (copia y pega el nombre tal cual aparece).
- No inventes ejercicios nuevos ni uses nombres alternativos.
- Respetá el número de días por semana de la alumna.
- Para ciclos de 4 semanas: aplicá periodización lineal: semana 1 base (volumen moderado, intensidad media), semana 2 progresión (+reps o +series), semana 3 pico (máxima intensidad, menor volumen), semana 4 descarga (−30% volumen para recuperación).
- Para ciclos de 1 semana: generá UNA semana óptima y autosuficiente. NO es la semana 1 de un ciclo progresivo; es la mejor semana posible teniendo en cuenta el objetivo, el nivel y el historial. Usá series y reps que representen un estímulo efectivo y manejable.
- Si hay lesiones activas, evitá CUALQUIER ejercicio que comprometa esa zona.
- El objetivo es planificar entre 10 y 12 ejercicios por sesión. Ajustá dentro de ese rango según el tiempo disponible: 30min→8-9 ejercicios, 45min→9-10, 60min→10-11, 75min→11-12, 90min→12. Sin tiempo especificado → 10-11 por defecto.
- En el historial de pesos: ↑ significa que el peso aumentó (está progresando bien), = significa estancamiento (considerar cambio de estímulo), ↓ significa regresión (revisar el motivo).
- Para cada ejercicio incluí: nombre (exacto de biblioteca), series (solo número, ej: "3"), reps (ej: "10-12") y tip (consejo técnico breve y concreto, máx 80 caracteres), como dice el FORMATO DE RESPUESTA.
- Variá los ejercicios entre semanas cuando tenga sentido (mismos grupos, distinto estímulo).
- Para peso_sugerido: si el ejercicio aparece en el historial de pesos, calculá el peso de inicio recomendado para la semana 1 del nuevo ciclo. Lógica: RPE ≤7 o tendencia ↑ → último peso + pequeño incremento (0.5kg si <10kg, 1kg si 10-20kg, 2.5kg si >20kg). RPE 8-9 → mismo peso. RPE 10 o tendencia ↓ → mismo peso o −5%. Sin historial, no pongas el campo. Usá siempre el mismo peso_sugerido en las 4 semanas para el mismo ejercicio (la periodización va en series/reps, no en peso).

REGLA DE EQUIPAMIENTO (CRÍTICO — MÁXIMA PRIORIDAD):
- Cada ejercicio en la biblioteca tiene su equipamiento entre corchetes, ej: [mancuernas], [banda elástica], [barra], [polea/cables], [sin equipamiento].
- El perfil de la alumna lista explícitamente las etiquetas PERMITIDAS y las etiquetas PROHIBIDAS.
- [sin equipamiento] siempre está permitido.
- NUNCA uses un ejercicio cuya etiqueta figure en las PROHIBIDAS, sin excepciones. Esta regla tiene prioridad absoluta sobre el objetivo, el split, el foco muscular y cualquier otra regla.
- Si una sesión queda con pocas opciones por las restricciones de equipamiento, usá más variantes [sin equipamiento] o ajustá el volumen, pero NUNCA violes esta regla.

REGLA DE NIVEL (CRÍTICO):
- Cada ejercicio tiene su dificultad marcada como [N1] (básico), [N2] (intermedio) o [N3] (avanzado). Sin marca = sin clasificar, podés usarlos libremente.
- principiante → usá principalmente N1, algún N2 hacia el final del ciclo. NUNCA N3.
- intermedio → mix de N1 y N2, podés incluir algún N3 como variante de semana 3.
- avanzado → podés usar N1/N2/N3 libremente según el objetivo de la sesión.
- Si la alumna no tiene nivel definido, usá criterio moderado (mix N1+N2).

REGLA DE ROTACIÓN (evitar que la rutina se vuelva repetitiva):
- Recibís la rutina anterior como referencia de ESTRUCTURA (días, volumen, orden), NO como plantilla para copiar ejercicio por ejercicio.
- Al menos el 40% de los ejercicios del ciclo nuevo deben ser DISTINTOS de los del ciclo anterior.
- La lista "EJERCICIOS DESGASTADOS" son los que la alumna viene repitiendo hace varios ciclos. Sacá o reemplazá la mayoría: elegí otro ejercicio del MISMO patrón de movimiento y grupo muscular, para que el estímulo se mantenga y cambie solo la variante.
- La lista "EJERCICIOS QUE NUNCA HIZO" es tu primera fuente para reemplazar, siempre que respeten su equipamiento, su nivel y sus lesiones. Si uno no cumple alguna de esas tres cosas, descartalo: la variedad nunca justifica romper una restricción.
- EXCEPCIÓN: los multiarticulares base (sentadilla, peso muerto, press, remo) SÍ deben repetirse ciclo a ciclo, porque la progresión de carga vive ahí. Rotá su variante (goblet → sumo → búlgara), no el patrón. Lo que cansa es repetir aislamientos, no repetir sentadillas.
- Si la alumna lleva muchos ciclos y casi no quedan ejercicios sin usar, priorizá rotar los de la lista de desgastados entre sí, alternando cuáles entran en este ciclo.

REGLA DE PATRONES DE MOVIMIENTO:
- Cada ejercicio tiene su patrón entre corchetes: [empuje_horizontal], [empuje_vertical], [jale_horizontal], [jale_vertical], [bisagra], [sentadilla], [core], [aislamiento], [cardio].
- En cada sesión de tren superior: incluí al menos 1 empuje (horizontal o vertical) Y 1 jale (horizontal o vertical) para equilibrar la musculatura antagonista.
- En cada sesión de tren inferior: incluí al menos 1 patrón de sentadilla Y 1 de bisagra para trabajar cuádriceps e isquiotibiales de forma equilibrada.
- En sesiones de cuerpo completo: respetá ambas reglas anteriores.
- Los ejercicios de [aislamiento] son complementarios; no deben ser el único trabajo de un grupo muscular en la sesión.

REGLA DE BALANCE EN SESIONES DE CUERPO COMPLETO (full_body y full_body_ab):
- Tren inferior (piernas, glúteos, isquiotibiales, cuádriceps, gemelos): MÁXIMO 5 ejercicios por sesión, aunque haya foco en glúteos. El foco muscular se expresa dentro de ese límite eligiendo los mejores ejercicios del grupo, no acumulando más.
- Tren superior (pecho, espalda, hombros, bíceps, tríceps): MÍNIMO 3 ejercicios por sesión. Es innegociable aunque el foco sea tren inferior.
- Core (abdomen, zona lumbar, estabilizadores): MÍNIMO 1 ejercicio directo por sesión, idealmente 2.
- Esta regla NO aplica a días dedicados de tren inferior (días Lower en upper/lower, día de piernas en push/pull/legs). Esos días pueden tener 6-8 ejercicios de tren inferior porque esa es su función.
- Ejemplo válido de distribución en full_body con foco glúteos (10 ejercicios): 5 tren inferior + 4 tren superior + 1 core.

REGLA DE ORDEN DENTRO DE CADA SESIÓN:
- Siempre ordená los ejercicios de mayor a menor complejidad e impacto neurológico:
  1. Primero: multiarticulares pesados (sentadilla, peso muerto, press con barra, remo con barra, dominada)
  2. Segundo: multiarticulares con mancuernas o máquina (prensa, press inclinado, remo con mancuerna)
  3. Tercero: ejercicios complementarios y unilaterales (zancada, hip thrust, pull-over)
  4. Último: aislamientos (curl de bíceps, extensión de tríceps, elevación lateral, core)
- Esta regla es fija: nunca pongas un aislamiento antes de un compuesto aunque sean del mismo grupo.

REGLA DE POSICIÓN EN SESIÓN:
- Cada ejercicio tiene su posición marcada: [de pie], [sentada], [acostada boca arriba], [acostada boca abajo], [inclinada], [en cuadrupedia], [arrodillada].
- Evitá más de 3 ejercicios consecutivos en la misma posición (especialmente en el suelo). Alternár posiciones hace la sesión más variada y fluida.
- Los ejercicios marcados [unilateral] trabajan un solo lado a la vez. Incluí al menos 1 ejercicio [unilateral] por sesión para trabajar simetrías y prevenir compensaciones.

REGLA DE IMPACTO:
- Cada ejercicio tiene su nivel de impacto: [bajo impacto], [medio impacto], [alto impacto].
- principiante → 0 ejercicios de [alto impacto]. intermedio → máximo 1. avanzado → hasta 2 por sesión.
- Si hay lesiones activas, usá predominantemente ejercicios de [bajo impacto] en las zonas afectadas.

REGLA DEL BANCO:
- Algunos ejercicios llevan [necesita banco]: además de su equipamiento, requieren un banco, cajón o step donde acostarse o subirse.
- Tener mancuernas NO implica tener un banco. En casa casi nunca hay.
- Si la alumna no tiene banco entre su equipamiento, NUNCA uses un ejercicio marcado [necesita banco], aunque sí tenga el resto del equipamiento.
- Para el mismo estímulo en el suelo existen alternativas en la biblioteca (por ejemplo press y aperturas de pecho en suelo). Usá esas.
- En gimnasio siempre hay banco: ahí no hay restricción.

REGLA DE CALENTAMIENTO:
- NO incluyas ejercicios de los grupos "Calentamiento" ni "Estiramiento" en la rutina generada.
- La entrenadora maneja el calentamiento y vuelta a la calma por separado.
- Todos los ejercicios de la rutina deben ser de trabajo efectivo.

REGLA DE DIVISIÓN DE SESIONES:
- El perfil de la alumna indica su split preferido. Respetalo estrictamente.
- full_body: cada sesión trabaja todos los grupos principales (piernas + tren superior + core). Ideal para 1-3 días.
- full_body_ab: para exactamente 2 días. Sesión A y sesión B trabajan los mismos grupos pero con ejercicios distintos. Nunca repitas el mismo ejercicio en A y B dentro de la misma semana.
- upper_lower: alternás sesiones de tren superior (pecho/espalda/hombros/brazos) con tren inferior (piernas/glúteos/gemelos). Ideal para 4 días.
- push_pull_legs: día 1=empuje (pecho/hombros/tríceps), día 2=tirón (espalda/bíceps), día 3=piernas y glúteos. Para 3 o 6 días.
- abc: día A / día B / día C con enfoques distintos definidos por el objetivo y los grupos de la alumna. Para 3+ días.
- Si no hay split especificado: 1 día→full_body, 2 días→full_body_ab, 3 días principiante→full_body, 3 días intermedio/avanzado→push_pull_legs, 4+ días→upper_lower o push_pull_legs.
- El nombre del "enfoque" de cada día debe reflejar claramente el split.

REGLA ESPECIAL PARA 1 DÍA POR SEMANA:
- Con solo 1 sesión semanal, esa sesión es el único estímulo de toda la semana. Debe ser completa y eficiente.
- Incluí obligatoriamente al menos: 1 patrón sentadilla O bisagra, 1 empuje, 1 jale, 1 core.
- Priorizá siempre los compuestos multiarticulares. Con tiempo limitado, un curl de bíceps puede quedar afuera; una sentadilla, nunca.
- Si el tiempo es ≤45 min, elegí los 4-5 ejercicios más impactantes para el objetivo y descartá aislamientos.
- Enfoque del día: "Cuerpo completo — sesión única semanal".

REGLA ESPECIAL PARA 2 DÍAS POR SEMANA (full_body_ab):
- Sesión A y sesión B deben cubrir los mismos grupos musculares pero nunca con los mismos ejercicios.
- Ejemplo: si el día A tiene sentadilla libre, el día B debe tener prensa o zancada (mismo patrón, distinto ejercicio).
- Si el día A tiene press de pecho con mancuernas, el día B debe tener flexiones o press con banda.
- Esto garantiza dos estímulos diferentes en la semana para el mismo músculo, lo que mejora la adaptación.
- Las 4 semanas del ciclo mantienen siempre la estructura A-B.

REGLA DE DÍAS CONSECUTIVOS:
- Si el perfil indica los días específicos de entrenamiento (ej: lunes, martes, jueves), detectá si hay días seguidos.
- Con días consecutivos (ej: lunes+martes), NUNCA pongas el mismo grupo muscular principal dos días seguidos: si el lunes trabajás piernas pesadas, el martes debés hacer tren superior o una sesión ligera de recuperación activa.
- Con días separados (ej: lunes+miércoles+viernes), hay descanso suficiente entre sesiones y podés distribuir los grupos libremente.
- Si los días no están especificados, asumí distribución ideal (días alternados).

REGLA DE FOCO MUSCULAR:
- Si la alumna tiene un foco muscular prioritario (ej: "glúteos"), ese grupo debe recibir entre un 30-40% más de volumen semanal total que los demás grupos.
- En práctica: cada sesión de cuerpo completo o tren inferior debe incluir AL MENOS 2 ejercicios directos de ese grupo. En splits superiores/inferiores, los días de tren inferior deben tener 3+ ejercicios del grupo foco.
- Dentro del día, los ejercicios del grupo foco van primero o segundo (después de los grandes compuestos pero antes de los complementarios).
- Si no hay foco especificado, distribuí el volumen de forma equilibrada según el objetivo general.

REGLA DE CICLO MENSTRUAL (cuando adaptar_ciclo_menstrual = true):
- La periodización de 4 semanas se alinea naturalmente con el ciclo hormonal femenino promedio. Mencionalo en la descripción de cada semana.
- Semana 1 (base): fase folicular temprana — el estrógeno sube progresivamente. Cargas moderadas, buena tolerancia al volumen. Descripción: "Base — fase folicular, buena tolerancia al volumen".
- Semana 2 (progresión): pico folicular / ovulación — máxima energía y fuerza disponible. Ideal para cargas más altas. Descripción: "Progresión — pico hormonal, máxima fuerza disponible".
- Semana 3 (pico): fase lútea temprana — energía alta todavía, pero puede comenzar la retención. Mantener intensidad alta con volumen controlado. Descripción: "Pico — lútea temprana, intensidad alta con volumen moderado".
- Semana 4 (descarga): fase lútea tardía / premenstrual — energía baja, mayor fatiga y sensibilidad. La descarga de volumen es especialmente importante. Descripción: "Descarga — premenstrual, reducción de volumen para recuperación activa".
- Para ciclos de 1 semana: generá la semana en base a la fase más común (folicular media) con intensidad efectiva y manejable.

REGLA DE ESTILO DE SESIÓN:
- "series_rectas" (o sin especificar): método clásico. Cada ejercicio se realiza en sus series completas antes de pasar al siguiente. NO agregues el campo superset_id en el JSON.
- "superseries": agrupá ejercicios en pares de músculos antagonistas (pecho+espalda, bíceps+tríceps, cuádriceps+isquiotibiales). Los ejercicios del par se realizan uno tras otro sin descanso, luego se descansa. Marcalos con superset_id: el primer par = "A", segundo par = "B", etc. Los ejercicios sin par (core, etc.) no llevan superset_id. Reducí levemente las series totales (2-3 superseries vs 3-4 series rectas) porque el volumen efectivo es mayor. NUNCA formes superseries de músculos sinérgicos (no emparejes press de pecho con press de hombros).
- "circuito": todos los ejercicios del día se realizan en secuencia sin descanso entre ellos (o con descanso muy breve). Asigná superset_id = "C" a TODOS los ejercicios de la sesión. Elegí 5-8 ejercicios variados (tren superior + tren inferior + core alternados para permitir recuperación parcial). Usá reps más altas (15-20) y cargas moderadas. Indicalo en el enfoque del día: "Circuito — [grupos]".

BIBLIOTECA DE EJERCICIOS DISPONIBLES:
(formato: - Nombre [equipamiento][patrón][nivel][posición][unilateral?][impacto])
${bibTexto}

FORMATO DE RESPUESTA:
Respondé solo con el JSON, en UNA SOLA LÍNEA, sin sangrías ni saltos de línea y sin texto antes ni después. El servidor corta la respuesta a los 2 minutos y medio: no escribas nada que no haga falta.
- razonamiento: 2-3 oraciones con la lógica central de esta rutina: por qué elegiste esta estructura, qué progresión aplicás y cómo se conecta con el objetivo, el nivel y el historial de la alumna.
- ciclo_nombre: ej. "Junio 2026".
- semanas: cada una con semana (número), descripcion (breve, ej. "Semana base — adaptación") y dias.
- dias: cada uno con dia (número), enfoque (ej. "Tren superior - Empuje + Jale") y ejercicios.
- ejercicios: cada uno con nombre (EXACTAMENTE como figura en la biblioteca, sin cambiar ni una letra), series (string numérico, ej. "3") y reps (ej. "10-12"), y además:
  - tip (consejo técnico breve, máx 80 caracteres) solo la primera vez que el ejercicio aparece en el ciclo. Si ya apareció antes, no lo repitas: se copia solo.
  - peso_sugerido (número, en kg) solo si hay historial de pesos de ese ejercicio. Si no hay, no pongas el campo.
  - superset_id solo con superseries o circuito (ver la nota de abajo).
Ejemplo de la forma (acortado):
{"razonamiento":"…","ciclo_nombre":"Junio 2026","semanas":[{"semana":1,"descripcion":"Semana base — adaptación","dias":[{"dia":1,"enfoque":"Cuerpo completo","ejercicios":[{"nombre":"Sentadilla goblet","series":"3","reps":"10-12","tip":"Bajá con la espalda recta y empujá desde los talones","peso_sugerido":12.5},{"nombre":"Remo cerrado","series":"3","reps":"12","tip":"Llevá los codos atrás, pegados al cuerpo"}]}]},{"semana":2,"descripcion":"Progresión","dias":[{"dia":1,"enfoque":"Cuerpo completo","ejercicios":[{"nombre":"Sentadilla goblet","series":"4","reps":"10-12","peso_sugerido":12.5},{"nombre":"Remo cerrado","series":"4","reps":"12"}]}]}]}
NOTA sobre superset_id: solo incluí este campo cuando el estilo_sesion sea "superseries" o "circuito". Para series rectas, omití el campo completamente (no lo pongas como null ni como ""). Dos ejercicios con el mismo superset_id se hacen back-to-back sin descanso entre ellos.`;

    // ── 7. User prompt (contexto variable) ───────────────────────
    // Build explicit permitted/prohibited equipment tag lists for the prompt.
    // This avoids the AI assuming mancuernas/banda are "generally available".
    const ALL_EQUIP_KEYS = ['mancuernas','banda_elastica','kettlebell','trx','fitball','step','banco','tobillera','ruedita','soga','barra','polea','maquina'];
    const EQUIP_TO_TAG: Record<string, string> = {
      mancuernas: 'mancuernas', banda_elastica: 'banda elástica', kettlebell: 'pesa rusa',
      trx: 'TRX', fitball: 'esfera', step: 'step/cajón', banco: 'necesita banco', tobillera: 'tobillera',
      ruedita: 'ruedita abdominal', soga: 'soga', barra: 'barra', polea: 'polea/cables', maquina: 'máquina'
    };
    const tipoStr = (alumna.tipo ?? '').toLowerCase();
    const isGym = ['gym','gimnasio','musculacion','musculación'].includes(tipoStr);
    const availableSet = new Set(alumna.equipamiento ?? []);
    const tagsPermitidos = ['[sin equipamiento]',
      ...ALL_EQUIP_KEYS.filter(k => isGym || availableSet.has(k)).map(k => `[${EQUIP_TO_TAG[k]}]`)
    ];
    const tagsProhibidos = isGym
      ? []
      : ALL_EQUIP_KEYS.filter(k => !availableSet.has(k)).map(k => `[${EQUIP_TO_TAG[k]}]`);
    const equipPermitStr = `Etiquetas PERMITIDAS: ${tagsPermitidos.join(', ')}`;
    const equipProhibStr = tagsProhibidos.length
      ? `Etiquetas PROHIBIDAS (alumna NO las tiene, NUNCA uses ejercicios con estas etiquetas): ${tagsProhibidos.join(', ')}`
      : 'Etiquetas PROHIBIDAS: ninguna (entrenamiento en gimnasio — todo disponible)';

    const objetivoLabels: Record<string, string> = {
      tonificar: "Tonificación muscular",
      bajar_peso: "Pérdida de peso",
      ganar_fuerza: "Ganancia de fuerza",
      salud: "Salud general",
      rehabilitacion: "Rehabilitación",
      rendimiento: "Rendimiento deportivo",
    };

    const nivelLabels: Record<string, string> = {
      principiante: "Principiante (<1 año de entrenamiento)",
      intermedio: "Intermedio (1–3 años)",
      avanzado: "Avanzado (+3 años, buena técnica)",
    };

    const splitLabels: Record<string, string> = {
      full_body:       "Full body — cuerpo completo cada sesión (aplicar regla especial de 1 día si dias=1)",
      full_body_ab:    "Full body A/B — dos sesiones distintas que se alternan (aplicar regla especial de 2 días)",
      upper_lower:     "Upper/Lower — tren superior / tren inferior alternado",
      push_pull_legs:  "Push/Pull/Legs — empuje / tirón / piernas",
      abc:             "A/B/C — tres enfoques distintos",
    };

    const prevRutinaStr = rutinasAnterior.length
      ? rutinasAnterior.map(r => {
          const exNames = (r.ejercicios as Array<{ nombre: string }>).map(e => e.nombre).join(", ");
          return `Sem ${r.semana} Día ${r.dia}: ${exNames}`;
        }).join("\n")
      : "Sin rutina previa disponible.";

    const pesoHistStr = Object.entries(sessionsByEx).length
      ? Object.entries(sessionsByEx)
          .slice(0, 25)
          .map(([nom, sessions]) => {
            const last = sessions[0];
            let trend = "";
            if (sessions.length >= 2 && last.kg > 0 && sessions[1].kg > 0) {
              if (last.kg > sessions[1].kg) trend = " ↑";
              else if (last.kg < sessions[1].kg) trend = " ↓";
              else trend = " =";
            }
            const rpeStr = last.rpe ? ` RPE ${last.rpe}` : "";
            const kgStr = last.kg > 0 ? `${last.kg} kg` : "sin registro de peso";
            return `- ${nom}: ${kgStr}${rpeStr}${trend}`;
          })
          .join("\n")
      : "Sin historial de pesos.";

    const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const hoy = new Date();
    const mesNombre = meses[(hoy.getMonth() + 1) % 12];
    const anoStr = hoy.getMonth() === 11 ? String(hoy.getFullYear() + 1) : String(hoy.getFullYear());

    const instruccionesStr = instrucciones
      ? `\nINSTRUCCIONES ESPECÍFICAS DE LA ENTRENADORA PARA ${semanas === 1 ? "ESTA SEMANA" : "ESTE CICLO"}:\n${instrucciones}\n`
      : "";

    const modoStr = semanas === 1
      ? "UNA SEMANA ÓPTIMA Y AUTOSUFICIENTE (no es semana 1 de un ciclo progresivo)"
      : `UN CICLO COMPLETO DE ${semanas} SEMANAS con periodización progresiva`;
    const userPrompt = `Generá ${modoStr} para la alumna "${alumna.nombre}".

PERFIL:
- Modalidad: ${alumna.tipo ?? "no especificado"}
- Días de entrenamiento por semana: ${alumna.dias ?? "no especificado"}
- Objetivo: ${objetivoLabels[alumna.objetivo ?? ""] ?? alumna.objetivo ?? "no especificado"}
- Nivel de experiencia: ${nivelLabels[alumna.nivel ?? ""] ?? alumna.nivel ?? "no especificado — usá criterio moderado"}
- División de sesiones: ${splitLabels[alumna.split ?? ""] ?? "no especificado — elegí según días y nivel"}
- Tiempo por sesión: ${alumna.tiempo_sesion ? alumna.tiempo_sesion + " minutos" : "no especificado"}
- ${equipPermitStr}
- ${equipProhibStr}
- Días específicos: ${alumna.dias_disponibles?.length ? alumna.dias_disponibles.join(", ") : "no especificado"}
- Foco muscular prioritario: ${alumna.foco_muscular ?? "sin foco especial"}
- Estilo de sesión: ${alumna.estilo_sesion === "superseries" ? "Superseries — pares de ejercicios antagonistas sin descanso entre ellos" : alumna.estilo_sesion === "circuito" ? "Circuito — todos los ejercicios seguidos con mínimo descanso" : "Series rectas — método clásico"}
- Adaptar al ciclo menstrual: ${alumna.adaptar_ciclo_menstrual ? "SÍ — ajustá la descripción de cada semana al ciclo hormonal según la REGLA DE CICLO MENSTRUAL" : "no"}
- Lesiones/limitaciones activas: ${alumna.lesiones ?? "ninguna"}
- Notas del entrenador sobre esta alumna: ${alumna.notas?.trim() || "ninguna"}
${instruccionesStr}
RUTINA ANTERIOR (ciclo ${cicloAnterior}) — usala como referencia de estructura, no como plantilla:
${prevRutinaStr}

EJERCICIOS DESGASTADOS (los viene repitiendo hace varios ciclos — reemplazá la mayoría por otra variante del mismo patrón):
${desgasteStr}

EJERCICIOS QUE NUNCA HIZO (primera fuente para reemplazar, siempre que respeten su equipamiento, nivel y lesiones):
${frescosStr}

HISTORIAL DE PESOS Y RPE (más reciente por ejercicio, ↑ subiendo ↓ bajando = estancado):
${pesoHistStr}

FEEDBACKS RECIENTES:
${fbResumen || "Sin feedbacks relevantes."}

Generá ${semanas} semana${semanas === 1 ? "" : "s"} con ${alumna.dias ?? 3} día${(alumna.dias ?? 3) === 1 ? "" : "s"} cada una. \
El nombre del ciclo debe ser "${mesNombre} ${anoStr}". \
${semanas === 1 ? "Esta es una semana independiente: elegí la mejor combinación de ejercicios para el nivel actual de la alumna, no como base de una progresión futura. " : ""}\
IMPORTANTE: los nombres de ejercicios deben coincidir EXACTAMENTE con los de la biblioteca. \
Respondé ÚNICAMENTE con el JSON en una sola línea (empezando con { y terminando con }), sin texto antes ni después.`;

    // ── 8. Llamada a Claude API con prompt caching ───────────────
    // ~1800 tokens por sesión: 10-12 ejercicios × ~130 tokens + metadata
    const numSesiones = (alumna.dias ?? 3) * semanas;
    const maxTokens = Math.min(32768, Math.max(8192, numSesiones * 1800));

    const claudeResp = await pedirAClaude({
      model: "claude-opus-4-7",
      max_tokens: maxTokens,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" },
        }
      ],
      messages: [{ role: "user", content: userPrompt }],
    }, inicio, { "anthropic-beta": "prompt-caching-2024-07-31" });

    if (!claudeResp) return Response.json({ error: TARDE }, { status: 504, headers: CORS });
    if (!claudeResp.ok) {
      return Response.json({ error: `Claude API error ${claudeResp.status}`, detail: claudeResp.texto }, { status: 502, headers: CORS });
    }

    const claudeData = JSON.parse(claudeResp.texto) as {
      content: Array<{ type: string; text?: string }>;
      usage?: { input_tokens: number; output_tokens: number; cache_creation_input_tokens?: number; cache_read_input_tokens?: number };
    };

    const rawText = claudeData.content?.find(b => b.type === "text")?.text ?? "";
    const usage = claudeData.usage;
    console.log(`[generate-routine] tokens: in=${usage?.input_tokens} out=${usage?.output_tokens} cache_read=${usage?.cache_read_input_tokens} max_tokens=${maxTokens} ms=${Date.now() - inicio}`);

    // Extraer JSON (Claude a veces añade markdown ```json ... ```)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log(`[generate-routine] Sin JSON en respuesta. raw=${rawText.slice(0, 300)}`);
      return Response.json({ error: "Claude no devolvió JSON válido", raw: rawText.slice(0, 500) }, { status: 502, headers: CORS });
    }

    let routine: unknown;
    try {
      routine = JSON.parse(jsonMatch[0]);
    } catch (parseErr) {
      // Si el JSON está truncado (output cortado por max_tokens), intentar repararlo
      // buscando el último bloque de semana completo
      console.log(`[generate-routine] JSON parse falló (output_tokens=${usage?.output_tokens}/${maxTokens}). Intentando reparar...`);
      let repaired: unknown | null = null;
      try {
        let s = jsonMatch[0];
        // Cerrar arrays y objetos abiertos desde el final
        const opens = ['{', '['];
        const closes: string[] = [];
        for (const ch of s) { if (ch === '{') closes.push('}'); else if (ch === '[') closes.push(']'); else if (ch === '}' || ch === ']') closes.pop(); }
        // Quitar coma trailing antes de cerrar
        s = s.replace(/,\s*$/, '');
        s += closes.reverse().join('');
        repaired = JSON.parse(s);
      } catch { /* no se pudo reparar */ }

      if (repaired) {
        console.log(`[generate-routine] JSON reparado exitosamente.`);
        routine = repaired;
      } else {
        console.log(`[generate-routine] No se pudo reparar. raw=${rawText.slice(0, 300)}`);
        return Response.json({
          error: "JSON de Claude no parseable",
          raw: rawText.slice(0, 500),
          parseError: String(parseErr),
          hint: `El modelo generó ${usage?.output_tokens ?? '?'} tokens (límite: ${maxTokens}). Si el error persiste, intentá con menos semanas.`
        }, { status: 502, headers: CORS });
      }
    }

    // ── 9. Validar que la rutina tenga todas las semanas y días ──
    const routineObj = routine as {
      semanas?: Array<{ semana: number; dias?: Array<{ dia: number; ejercicios?: unknown[] }> }>;
    };
    const diasEsperados = alumna.dias ?? 3;
    const faltantes: string[] = [];
    for (let s = 1; s <= semanas; s++) {
      const semRow = routineObj.semanas?.find(w => w.semana === s);
      if (!semRow) { faltantes.push(`Semana ${s} completa`); continue; }
      for (let d = 1; d <= diasEsperados; d++) {
        const dayRow = semRow.dias?.find(day => day.dia === d);
        if (!dayRow || !dayRow.ejercicios?.length) faltantes.push(`Sem${s}/Día${d}`);
      }
    }
    if (faltantes.length > 0) {
      console.log(`[generate-routine] Rutina incompleta. Faltantes: ${faltantes.join(', ')}. output_tokens=${usage?.output_tokens}/${maxTokens}`);
      return Response.json({
        error: `Rutina incompleta — faltan: ${faltantes.join(', ')}. Intentá generar semana por semana (1 semana a la vez) para reducir el tamaño de la respuesta.`,
        faltantes,
        usage,
      }, { status: 502, headers: CORS });
    }

    // ── 10. El tip viene solo la primera vez que aparece cada ejercicio: se copia al resto
    const ordenadas = [...(routineObj.semanas ?? [])].sort((a, b) => a.semana - b.semana);
    const tipDe: Record<string, string> = {};
    const ejerciciosEnOrden = ordenadas.flatMap(s => [...(s.dias ?? [])].sort((a, b) => a.dia - b.dia)
      .flatMap(d => (d.ejercicios ?? []) as Array<{ nombre?: string; tip?: string }>));
    for (const ex of ejerciciosEnOrden) {
      const tip = typeof ex?.tip === "string" ? ex.tip.trim() : "";
      if (ex?.nombre && tip && !tipDe[ex.nombre]) tipDe[ex.nombre] = tip;
    }
    for (const ex of ejerciciosEnOrden) {
      if (ex?.nombre && !(typeof ex.tip === "string" && ex.tip.trim()) && tipDe[ex.nombre]) ex.tip = tipDe[ex.nombre];
    }

    return Response.json({
      routine,
      usage,
      alumna: alumna.nombre,
    }, { headers: CORS });

  } catch (e) {
    return Response.json({ error: String(e), stack: e instanceof Error ? e.stack : undefined }, { status: 500, headers: CORS });
  }
});

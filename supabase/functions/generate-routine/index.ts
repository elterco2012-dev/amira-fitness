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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });

  const apikey = req.headers.get("apikey") ?? req.headers.get("x-api-key") ?? "";
  if (!apikey) return new Response("Unauthorized", { status: 401, headers: CORS });

  if (!ANTHROPIC_API_KEY) {
    return Response.json({ error: "ANTHROPIC_API_KEY no configurada en los secrets del proyecto" }, { status: 500, headers: CORS });
  }

  let body: { alumna_id?: number; semanas?: number };
  try { body = await req.json(); } catch { return Response.json({ error: "JSON inválido" }, { status: 400, headers: CORS }); }

  const { alumna_id, semanas = 4 } = body;
  if (!alumna_id) return Response.json({ error: "alumna_id requerido" }, { status: 400, headers: CORS });

  try {
    // ── 1. Recolectar contexto de la alumna ──────────────────────
    const [alumnas, biblioteca, rutinas, progreso, feedbacks] = await Promise.all([
      dbFetch(`alumnas?id=eq.${alumna_id}&select=id,nombre,tipo,dias,lesiones,objetivo,equipamiento,tiempo_sesion,ciclo_actual`),
      dbFetch("ejercicios_biblioteca?select=nombre,grupo_muscular,descripcion&order=grupo_muscular.asc,nombre.asc"),
      dbFetch(`rutinas?alumna_id=eq.${alumna_id}&order=ciclo.desc,semana.asc,dia.asc&limit=100`),
      dbFetch(`progreso?alumna_id=eq.${alumna_id}&hecho=eq.true&select=ciclo,semana,dia,ejercicio_nombre,ejercicio_idx,peso_kg,rpe&order=ciclo.desc,semana.desc&limit=200`),
      dbFetch(`feedbacks?alumna_id=eq.${alumna_id}&select=tipo,descripcion,created_at&order=created_at.desc&limit=20`),
    ]) as [unknown[], unknown[], unknown[], unknown[], unknown[]];

    if (!alumnas.length) return Response.json({ error: "Alumna no encontrada" }, { status: 404, headers: CORS });
    const alumna = alumnas[0] as {
      nombre: string; tipo?: string; dias?: number; lesiones?: string | null;
      objetivo?: string | null; equipamiento?: string[] | null; tiempo_sesion?: number | null; ciclo_actual?: number;
    };

    // ── 2. Ciclo anterior: estructura de días ────────────────────
    const cicloActual = alumna.ciclo_actual ?? 1;
    const cicloAnterior = cicloActual >= 1 ? cicloActual : 0;
    const rutinasAnterior = (rutinas as Array<{ ciclo: number; semana: number; dia: number; ejercicios: unknown[] }>)
      .filter(r => r.ciclo === cicloAnterior)
      .sort((a, b) => a.semana - b.semana || a.dia - b.dia);

    // ── 3. Historial de pesos y RPE (últimas sesiones por ejercicio)
    type ProgresoRow = { ejercicio_nombre?: string; peso_kg?: number | null; rpe?: number | null; semana: number; ciclo: number };
    const lastKgByEx: Record<string, { kg: number; rpe: number | null }> = {};
    for (const p of progreso as ProgresoRow[]) {
      const nom = p.ejercicio_nombre;
      if (!nom) continue;
      if (!lastKgByEx[nom]) lastKgByEx[nom] = { kg: p.peso_kg ?? 0, rpe: p.rpe ?? null };
    }

    // ── 4. Feedbacks recientes relevantes ────────────────────────
    type Feedback = { tipo: string; descripcion?: string; created_at: string };
    const fbResumen = (feedbacks as Feedback[])
      .filter(f => ["dolor_preocupante", "dolor_articular", "muy_cansada", "rpe"].includes(f.tipo))
      .slice(0, 8)
      .map(f => `- ${f.tipo}${f.descripcion ? ": " + f.descripcion : ""} (${f.created_at.slice(0, 10)})`)
      .join("\n");

    // ── 5. Biblioteca como string cacheada ───────────────────────
    type BibRow = { nombre: string; grupo_muscular?: string; descripcion?: string };
    const bibByGroup: Record<string, string[]> = {};
    for (const ex of biblioteca as BibRow[]) {
      const g = ex.grupo_muscular ?? "Otros";
      if (!bibByGroup[g]) bibByGroup[g] = [];
      bibByGroup[g].push(ex.nombre + (ex.descripcion ? ` (${ex.descripcion.slice(0, 60)})` : ""));
    }
    const bibTexto = Object.entries(bibByGroup)
      .map(([g, exs]) => `### ${g}\n${exs.map(e => `- ${e}`).join("\n")}`)
      .join("\n\n");

    // ── 6. System prompt (parte cacheada) ───────────────────────
    const systemPrompt = `Sos una entrenadora personal experta en fitness femenino. \
Tu tarea es generar rutinas de entrenamiento progresivas, seguras y efectivas \
basadas en el perfil de la alumna y el historial de entrenamiento disponible.

REGLAS:
- Usá SOLO ejercicios de la biblioteca proporcionada. Los nombres deben coincidir EXACTAMENTE.
- No inventes ejercicios nuevos.
- Respetá el número de días por semana de la alumna.
- Aplicá periodización: variá la intensidad entre semanas (semana 1 base, semana 2 progresión, semana 3 pico, semana 4 descarga si corresponde).
- Si hay lesiones activas, evitá ejercicios que las comprometan.
- Ajustá el volumen al tiempo disponible por sesión.
- Para cada ejercicio incluí: nombre (exacto de la biblioteca), series (número), reps (ej: "10-12" o "8"), tip (consejo técnico breve).
- Incluí el grupo muscular principal en el campo "grupo".

BIBLIOTECA DE EJERCICIOS DISPONIBLES:
${bibTexto}

FORMATO DE RESPUESTA (JSON estricto, sin texto extra):
{
  "ciclo_nombre": "string (ej: Junio 2026)",
  "semanas": [
    {
      "semana": 1,
      "descripcion": "string breve (ej: Semana base — adaptación)",
      "dias": [
        {
          "dia": 1,
          "enfoque": "string (ej: Tren superior - Empuje)",
          "ejercicios": [
            {
              "nombre": "string (exacto de la biblioteca)",
              "series": "string (ej: 3)",
              "reps": "string (ej: 10-12)",
              "tip": "string (consejo técnico)",
              "grupo": "string"
            }
          ]
        }
      ]
    }
  ]
}`;

    // ── 7. User prompt (contexto variable) ───────────────────────
    const equipStr = alumna.equipamiento?.length
      ? alumna.equipamiento.join(", ")
      : "sin equipamiento especificado";

    const objetivoLabels: Record<string, string> = {
      tonificar: "Tonificación muscular",
      bajar_peso: "Pérdida de peso",
      ganar_fuerza: "Ganancia de fuerza",
      salud: "Salud general",
      rehabilitacion: "Rehabilitación",
      rendimiento: "Rendimiento deportivo",
    };

    const prevRutinaStr = rutinasAnterior.length
      ? rutinasAnterior.map(r => {
          const exNames = (r.ejercicios as Array<{ nombre: string }>).map(e => e.nombre).join(", ");
          return `Sem ${r.semana} Día ${r.dia}: ${exNames}`;
        }).join("\n")
      : "Sin rutina previa disponible.";

    const pesoHistStr = Object.entries(lastKgByEx).length
      ? Object.entries(lastKgByEx)
          .slice(0, 20)
          .map(([nom, d]) => `- ${nom}: ${d.kg > 0 ? d.kg + " kg" : "sin peso"}${d.rpe ? ` (RPE ${d.rpe})` : ""}`)
          .join("\n")
      : "Sin historial de pesos.";

    const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const hoy = new Date();
    const mesNombre = meses[(hoy.getMonth() + 1) % 12];
    const anoStr = hoy.getMonth() === 11 ? String(hoy.getFullYear() + 1) : String(hoy.getFullYear());

    const userPrompt = `Generá una rutina de ${semanas} semanas para la alumna "${alumna.nombre}".

PERFIL:
- Modalidad: ${alumna.tipo ?? "no especificado"}
- Días de entrenamiento por semana: ${alumna.dias ?? "no especificado"}
- Objetivo: ${objetivoLabels[alumna.objetivo ?? ""] ?? alumna.objetivo ?? "no especificado"}
- Tiempo por sesión: ${alumna.tiempo_sesion ? alumna.tiempo_sesion + " minutos" : "no especificado"}
- Equipamiento disponible: ${equipStr}
- Lesiones/limitaciones activas: ${alumna.lesiones ?? "ninguna"}

RUTINA ANTERIOR (ciclo ${cicloAnterior}):
${prevRutinaStr}

HISTORIAL DE PESOS Y RPE (más reciente por ejercicio):
${pesoHistStr}

FEEDBACKS RECIENTES:
${fbResumen || "Sin feedbacks relevantes."}

Generá ${semanas} semanas completas con ${alumna.dias ?? 3} días cada una. \
El nombre del ciclo debe ser "${mesNombre} ${anoStr}". \
Respondé ÚNICAMENTE con el JSON, sin explicaciones adicionales.`;

    // ── 8. Llamada a Claude API con prompt caching ───────────────
    const claudeResp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "prompt-caching-2024-07-31",
      },
      body: JSON.stringify({
        model: "claude-opus-4-7",
        max_tokens: 8192,
        system: [
          {
            type: "text",
            text: systemPrompt,
            cache_control: { type: "ephemeral" },
          }
        ],
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!claudeResp.ok) {
      const errBody = await claudeResp.text();
      return Response.json({ error: `Claude API error ${claudeResp.status}`, detail: errBody }, { status: 502, headers: CORS });
    }

    const claudeData = await claudeResp.json() as {
      content: Array<{ type: string; text?: string }>;
      usage?: { input_tokens: number; output_tokens: number; cache_creation_input_tokens?: number; cache_read_input_tokens?: number };
    };

    const rawText = claudeData.content?.find(b => b.type === "text")?.text ?? "";

    // Extraer JSON (Claude a veces añade markdown ```json ... ```)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: "Claude no devolvió JSON válido", raw: rawText.slice(0, 500) }, { status: 502, headers: CORS });
    }

    let routine: unknown;
    try {
      routine = JSON.parse(jsonMatch[0]);
    } catch (e) {
      return Response.json({ error: "JSON de Claude no parseable", raw: rawText.slice(0, 500), parseError: String(e) }, { status: 502, headers: CORS });
    }

    return Response.json({
      routine,
      usage: claudeData.usage,
      alumna: alumna.nombre,
    }, { headers: CORS });

  } catch (e) {
    return Response.json({ error: String(e), stack: e instanceof Error ? e.stack : undefined }, { status: 500, headers: CORS });
  }
});

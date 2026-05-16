// Clasifica ejercicios de la biblioteca con patron_movimiento, nivel_dificultad y equipamiento_requerido.
// Usa claude-haiku (rápido y económico) porque es una tarea de clasificación simple.

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY") ?? "";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });

  const apikey = req.headers.get("apikey") ?? req.headers.get("x-api-key") ?? "";
  if (!apikey) return new Response("Unauthorized", { status: 401, headers: CORS });
  if (!ANTHROPIC_API_KEY) return Response.json({ error: "ANTHROPIC_API_KEY no configurada" }, { status: 500, headers: CORS });

  type EjRow = { id: number; nombre: string; grupo_muscular?: string; descripcion?: string };
  let body: { ejercicios?: EjRow[] };
  try { body = await req.json(); } catch { return Response.json({ error: "JSON inválido" }, { status: 400, headers: CORS }); }

  const { ejercicios } = body;
  if (!ejercicios?.length) return Response.json({ error: "ejercicios requerido" }, { status: 400, headers: CORS });

  const lista = ejercicios
    .map(e => `- id:${e.id} | ${e.nombre} | ${e.grupo_muscular ?? ""} | ${e.descripcion ?? ""}`)
    .join("\n");

  const prompt = `Clasificá cada ejercicio de fitness con exactamente estos 6 campos.

PATRON_MOVIMIENTO — elegí uno:
• empuje_horizontal — press pecho, flexiones, press banco inclinado/plano
• empuje_vertical   — press militar, press de hombros sobre la cabeza
• jale_horizontal  — remo (mancuerna, barra, polea baja, TRX, banda)
• jale_vertical    — dominadas, jalón al pecho, pull-down
• bisagra          — peso muerto, hip thrust, puente de glúteos, buenos días, romanian deadlift
• sentadilla       — sentadilla, prensa de pierna, zancada, estocada, goblet squat
• core             — plancha, abdominales, crunch, rotación de tronco, hollow hold, hiperextensión lumbar
• aislamiento      — curl bíceps, extensión tríceps, elevación lateral/frontal/posterior, leg curl, leg extension, patada de glúteo, abductor, aductor, gemelo/pantorrilla
• cardio           — burpees, salto, cuerda, bicicleta estática, step aeróbico, mountain climber

NIVEL_DIFICULTAD — número 1, 2 o 3:
• 1 básico      — técnica simple, apto desde el día 1 (curl con mancuernas, sentadilla corporal, plancha, glúteo en suelo)
• 2 intermedio  — requiere algo de técnica o coordinación (hip thrust con barra, remo con mancuerna, peso muerto mancuernas, zancada con peso, dominada asistida)
• 3 avanzado    — técnica compleja o carga alta (sentadilla con barra, peso muerto barra, dominada sin asistencia, pistol squat, turkish get-up)

EQUIPAMIENTO_REQUERIDO — elegí el principal:
• sin_equipamiento — peso corporal puro
• mancuernas       — ejercicio con mancuernas como material principal
• barra            — barra olímpica o barra fija (no smith)
• maquina          — máquina de cable, smith, leg press, chest fly, etc. (excepto polea)
• banda_elastica   — banda de resistencia o elástico
• kettlebell       — pesa rusa
• polea            — cable/polea específicamente (cable crossover, jalón polea, extensión polea)
• trx              — suspensión TRX
• fitball          — pelota de estabilidad
• step             — step, cajón o banco bajo

POSICION_EJERCICIO — elegí una:
• de_pie              — ejercicio realizado de pie (sentadillas, peso muerto, press militar, curl de pie)
• sentada             — sentada en banco, silla o máquina (press en máquina, curl sentado, extensión cuádriceps)
• acostada_boca_arriba — tumbada boca arriba (press de pecho en suelo, puente de glúteos, curl abdominal)
• acostada_boca_abajo  — tumbada boca abajo / plancha (flexiones, curl femoral en suelo)
• inclinada           — en banco inclinado/declinado o inclinada hacia adelante (press inclinado, kickback)
• en_cuadrupedia      — en cuatro apoyos (patada de glúteo en suelo, bird-dog)
• arrodillada         — de rodillas (nordic curl, press de hombros arrodillado)

BILATERAL — true o false:
• true  — trabaja ambos lados a la vez (sentadilla, press, remo bilateral, curl con barra)
• false — trabaja un lado a la vez o alternado (zancada, peso muerto a una pierna, curl alterno, kickback)

IMPACTO — bajo, medio o alto:
• bajo  — sin impacto (ejercicios de suelo, máquina, polea, sentados, peso muerto controlado)
• medio — impacto moderado (flexiones, step-up, chin-up, fondos, nordic curl)
• alto  — impacto articular alto (saltos, plyos, jump squat, box jump, flexiones explosivas, skipping)

EJERCICIOS A CLASIFICAR:
${lista}

Respondé ÚNICAMENTE con un array JSON (sin texto extra, sin markdown):
[{"id": 1, "patron_movimiento": "...", "nivel_dificultad": 1, "equipamiento_requerido": "...", "posicion_ejercicio": "...", "bilateral": true, "impacto": "bajo"}, ...]`;

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return Response.json({ error: `Claude API error ${resp.status}`, detail: err }, { status: 502, headers: CORS });
    }

    const data = await resp.json() as { content: Array<{ type: string; text?: string }> };
    const raw = data.content?.find(b => b.type === "text")?.text ?? "";

    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return Response.json({ error: "Claude no devolvió JSON válido", raw: raw.slice(0, 500) }, { status: 502, headers: CORS });

    let clasificaciones: unknown;
    try { clasificaciones = JSON.parse(jsonMatch[0]); }
    catch (e) { return Response.json({ error: "JSON no parseable", raw: raw.slice(0, 500), parseError: String(e) }, { status: 502, headers: CORS }); }

    return Response.json({ clasificaciones }, { headers: CORS });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500, headers: CORS });
  }
});

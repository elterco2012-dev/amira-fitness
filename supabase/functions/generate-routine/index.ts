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

  let body: { alumna_id?: number; semanas?: number; instrucciones?: string };
  try { body = await req.json(); } catch { return Response.json({ error: "JSON inválido" }, { status: 400, headers: CORS }); }

  const { alumna_id, semanas = 4, instrucciones } = body;
  if (!alumna_id) return Response.json({ error: "alumna_id requerido" }, { status: 400, headers: CORS });

  try {
    // ── 1. Recolectar contexto de la alumna ──────────────────────
    const [alumnas, biblioteca, rutinas, progreso, feedbacks] = await Promise.all([
      dbFetch(`alumnas?id=eq.${alumna_id}&select=id,nombre,tipo,dias,lesiones,notas,objetivo,equipamiento,tiempo_sesion,ciclo_actual,nivel,split,dias_disponibles,foco_muscular,adaptar_ciclo_menstrual,estilo_sesion`),
      dbFetch("ejercicios_biblioteca?select=nombre,grupo_muscular,descripcion,equipamiento_requerido,patron_movimiento,nivel_dificultad,observaciones,posicion_ejercicio,bilateral,impacto&order=grupo_muscular.asc,nombre.asc"),
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
    };
    const equipLabels: Record<string, string> = {
      sin_equipamiento: "sin equipamiento", mancuernas: "mancuernas", barra: "barra",
      maquina: "máquina", banda_elastica: "banda elástica", kettlebell: "pesa rusa",
      polea: "polea/cables", trx: "TRX", fitball: "esfera", step: "step/cajón"
    };
    const bibByGroup: Record<string, string[]> = {};
    for (const ex of biblioteca as BibRow[]) {
      const g = ex.grupo_muscular ?? "Otros";
      if (!bibByGroup[g]) bibByGroup[g] = [];
      const equip = ex.equipamiento_requerido ? `[${equipLabels[ex.equipamiento_requerido] ?? ex.equipamiento_requerido}]` : "[sin equipamiento]";
      const patron = ex.patron_movimiento ? `[${ex.patron_movimiento}]` : "";
      const nivel  = ex.nivel_dificultad   ? `[N${ex.nivel_dificultad}]` : "";
      const pos    = ex.posicion_ejercicio  ? `[${ex.posicion_ejercicio.replace(/_/g," ")}]` : "";
      const uni    = ex.bilateral === false  ? "[unilateral]" : "";
      const imp    = ex.impacto             ? `[${ex.impacto} impacto]` : "";
      const obs    = ex.observaciones      ? ` ⚠️ ${ex.observaciones.slice(0, 80)}` : "";
      bibByGroup[g].push(`- ${ex.nombre} ${equip}${patron}${nivel}${pos}${uni}${imp}${ex.descripcion ? ` — ${ex.descripcion.slice(0, 50)}` : ""}${obs}`);
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
- Ajustá el número de ejercicios por sesión al tiempo disponible: 30min→4-5 ejercicios, 45min→5-6, 60min→6-8, 75min→8-9, 90min→9-10.
- En el historial de pesos: ↑ significa que el peso aumentó (está progresando bien), = significa estancamiento (considerar cambio de estímulo), ↓ significa regresión (revisar el motivo).
- Para cada ejercicio incluí: nombre (exacto de biblioteca), series (solo número, ej: "3"), reps (ej: "10-12"), tip (consejo técnico breve y concreto, máx 80 caracteres), grupo muscular.
- Variá los ejercicios entre semanas cuando tenga sentido (mismos grupos, distinto estímulo).
- Para peso_sugerido: si el ejercicio aparece en el historial de pesos, calculá el peso de inicio recomendado para la semana 1 del nuevo ciclo. Lógica: RPE ≤7 o tendencia ↑ → último peso + pequeño incremento (0.5kg si <10kg, 1kg si 10-20kg, 2.5kg si >20kg). RPE 8-9 → mismo peso. RPE 10 o tendencia ↓ → mismo peso o −5%. Sin historial → null. Usá siempre el mismo peso_sugerido en las 4 semanas para el mismo ejercicio (la periodización va en series/reps, no en peso).

REGLA DE EQUIPAMIENTO (CRÍTICO):
- Cada ejercicio tiene su equipamiento entre corchetes [ej: mancuernas].
- Usá ÚNICAMENTE ejercicios cuyo equipamiento esté disponible para la alumna.
- Ejercicios [sin equipamiento] siempre están permitidos.
- Si la alumna no tiene acceso a gimnasio, NUNCA uses ejercicios [máquina], [barra] o [polea/cables].

REGLA DE NIVEL (CRÍTICO):
- Cada ejercicio tiene su dificultad marcada como [N1] (básico), [N2] (intermedio) o [N3] (avanzado). Sin marca = sin clasificar, podés usarlos libremente.
- principiante → usá principalmente N1, algún N2 hacia el final del ciclo. NUNCA N3.
- intermedio → mix de N1 y N2, podés incluir algún N3 como variante de semana 3.
- avanzado → podés usar N1/N2/N3 libremente según el objetivo de la sesión.
- Si la alumna no tiene nivel definido, usá criterio moderado (mix N1+N2).

REGLA DE PATRONES DE MOVIMIENTO:
- Cada ejercicio tiene su patrón entre corchetes: [empuje_horizontal], [empuje_vertical], [jale_horizontal], [jale_vertical], [bisagra], [sentadilla], [core], [aislamiento], [cardio].
- En cada sesión de tren superior: incluí al menos 1 empuje (horizontal o vertical) Y 1 jale (horizontal o vertical) para equilibrar la musculatura antagonista.
- En cada sesión de tren inferior: incluí al menos 1 patrón de sentadilla Y 1 de bisagra para trabajar cuádriceps e isquiotibiales de forma equilibrada.
- En sesiones de cuerpo completo: respetá ambas reglas anteriores.
- Los ejercicios de [aislamiento] son complementarios; no deben ser el único trabajo de un grupo muscular en la sesión.

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

FORMATO DE RESPUESTA (JSON estricto, sin texto extra antes ni después):
{
  "razonamiento": "2-3 oraciones explicando la lógica central de esta rutina: por qué elegiste esta estructura, qué progresión aplicás y cómo se conecta con el objetivo, el nivel y el historial de la alumna.",
  "ciclo_nombre": "string (ej: Junio 2026)",
  "semanas": [
    {
      "semana": 1,
      "descripcion": "string breve (ej: Semana base — adaptación)",
      "dias": [
        {
          "dia": 1,
          "enfoque": "string (ej: Tren superior - Empuje + Jale)",
          "ejercicios": [
            {
              "nombre": "string (EXACTAMENTE como figura en la biblioteca, sin cambiar ni una letra)",
              "series": "string numérico (ej: 3)",
              "reps": "string (ej: 10-12)",
              "tip": "string (consejo técnico breve, máx 80 caracteres)",
              "grupo": "string",
              "peso_sugerido": 12.5,
              "superset_id": "A"
            }
          ]
        }
      ]
    }
  ]
}
NOTA sobre superset_id: solo incluí este campo cuando el estilo_sesion sea "superseries" o "circuito". Para series rectas, omití el campo completamente (no lo pongas como null ni como ""). Dos ejercicios con el mismo superset_id se hacen back-to-back sin descanso entre ellos.`;

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
- Equipamiento disponible: ${equipStr}
- Días específicos: ${alumna.dias_disponibles?.length ? alumna.dias_disponibles.join(", ") : "no especificado"}
- Foco muscular prioritario: ${alumna.foco_muscular ?? "sin foco especial"}
- Estilo de sesión: ${alumna.estilo_sesion === "superseries" ? "Superseries — pares de ejercicios antagonistas sin descanso entre ellos" : alumna.estilo_sesion === "circuito" ? "Circuito — todos los ejercicios seguidos con mínimo descanso" : "Series rectas — método clásico"}
- Adaptar al ciclo menstrual: ${alumna.adaptar_ciclo_menstrual ? "SÍ — ajustá la descripción de cada semana al ciclo hormonal según la REGLA DE CICLO MENSTRUAL" : "no"}
- Lesiones/limitaciones activas: ${alumna.lesiones ?? "ninguna"}
- Notas del entrenador sobre esta alumna: ${alumna.notas?.trim() || "ninguna"}
${instruccionesStr}
RUTINA ANTERIOR (ciclo ${cicloAnterior}):
${prevRutinaStr}

HISTORIAL DE PESOS Y RPE (más reciente por ejercicio, ↑ subiendo ↓ bajando = estancado):
${pesoHistStr}

FEEDBACKS RECIENTES:
${fbResumen || "Sin feedbacks relevantes."}

Generá ${semanas} semana${semanas === 1 ? "" : "s"} con ${alumna.dias ?? 3} día${(alumna.dias ?? 3) === 1 ? "" : "s"} cada una. \
El nombre del ciclo debe ser "${mesNombre} ${anoStr}". \
${semanas === 1 ? "Esta es una semana independiente: elegí la mejor combinación de ejercicios para el nivel actual de la alumna, no como base de una progresión futura. " : ""}\
IMPORTANTE: los nombres de ejercicios deben coincidir EXACTAMENTE con los de la biblioteca. \
Respondé ÚNICAMENTE con el JSON (empezando con { y terminando con }), sin texto antes ni después.`;

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

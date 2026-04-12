-- ============================================================
-- AMIRA FITNESS — SQL COMPLETO PARA SUPABASE
-- Ejecutar en: Supabase → SQL Editor → New query → Run
-- ============================================================

-- PASO 1: Limpiar datos anteriores (si los hay)
delete from rutinas where alumna_id = 1000001;
delete from alumnas where id = 1000001;

-- PASO 2: Insertar María
insert into alumnas (id, nombre, slug, tipo, dias, notas, color, foto, tel)
values (
  1000001,
  'María González',
  'maria',
  'gym',
  3,
  'Cualquier molestia, avisame enseguida 💪',
  'teal',
  '',
  ''
)
on conflict (id) do update set
  nombre = excluded.nombre,
  slug = excluded.slug,
  tipo = excluded.tipo,
  dias = excluded.dias,
  notas = excluded.notas,
  color = excluded.color;

-- PASO 3: Insertar Día 1 — Tren inferior + core
insert into rutinas (alumna_id, semana, dia, ejercicios)
values (
  1000001, 1, 1,
  '[
    {"nombre":"Hollow Hold","series":"3","reps":"20-30\"","tip":"Espalda baja siempre apoyada. Si se despega, flexioná rodillas.","video":"https://youtube.com/shorts/o-XW-38ni2s"},
    {"nombre":"Crunch sobre esfera","series":"3","reps":"15","tip":"Movimiento controlado, no tires del cuello. Activá abdomen.","video":"https://youtube.com/shorts/4sORVXlsRog"},
    {"nombre":"Plancha con toque de hombros","series":"3","reps":"20","tip":"Evitá que la cadera se mueva. Activá abdomen.","video":"https://youtube.com/shorts/tzOH2YzP8QI"},
    {"nombre":"Cuádriceps a una pierna","series":"3","reps":"10 c/lado","tip":"Movimiento controlado, sin impulso. SIN CARGA.","video":"https://youtube.com/shorts/AcnKSxfj4ng"},
    {"nombre":"Sentadilla al cajón","series":"3","reps":"10","tip":"Bajá controlado, peso en talones.","video":"https://youtube.com/shorts/ASCwv9H6A4U"},
    {"nombre":"Isquiotibiales","series":"3","reps":"10","tip":"Poca carga. Subí y bajá de manera controlada.","video":"https://youtube.com/shorts/B6t8MvbTtew"},
    {"nombre":"Vuelos laterales","series":"3","reps":"10","tip":"No subas más allá de los hombros.","video":"https://youtube.com/shorts/VbS0cyfH2mk"},
    {"nombre":"Vuelos frontales","series":"3","reps":"10","tip":"Movimiento controlado, sin balanceo.","video":"https://youtube.com/shorts/YyWAmeBkVgg"}
  ]'::jsonb
)
on conflict (alumna_id, semana, dia) do update set ejercicios = excluded.ejercicios;

-- PASO 4: Insertar Día 2 — Core + tren superior + glúteos
insert into rutinas (alumna_id, semana, dia, ejercicios)
values (
  1000001, 1, 2,
  '[
    {"nombre":"Russian Twist","series":"3","reps":"16","tip":"Movimiento lento, girá desde el torso, no solo brazos.","video":"https://youtube.com/shorts/z9Kgzjr16WY"},
    {"nombre":"Ruedita (ab wheel)","series":"3","reps":"10","tip":"Mantené abdomen activo, no dejes caer la zona lumbar.","video":"https://youtube.com/shorts/6gGMYiw4__c"},
    {"nombre":"Dead Bug","series":"3","reps":"8 c/lado","tip":"Espalda baja apoyada, movimiento controlado.","video":"https://youtube.com/shorts/5HtD6fZEc60"},
    {"nombre":"Remo cerrado","series":"3","reps":"10","tip":"Llevá los codos hacia atrás, no encoges hombros.","video":"https://youtube.com/shorts/jyNOv953lnM"},
    {"nombre":"Press de pecho","series":"3","reps":"10","tip":"Controlá la bajada, no bloquees codos arriba.","video":"https://youtube.com/shorts/DfzDjXCO2Nw"},
    {"nombre":"Abductor","series":"3","reps":"10-12","tip":"Movimiento controlado, sin impulso.","video":"https://youtube.com/shorts/xlp6FYwBFLU"},
    {"nombre":"Patada de glúteo","series":"3","reps":"10","tip":"No arquees la espalda, movimiento desde el glúteo.","video":"https://youtube.com/shorts/GvgL2NbOaKE"},
    {"nombre":"Bíceps con mancuernas","series":"3","reps":"10","tip":"Evitá balanceo, codos fijos pegados a las costillas.","video":"https://youtube.com/shorts/jzCZyceISsY"},
    {"nombre":"Sentadilla común","series":"3","reps":"12","tip":"Peso en talones, rodillas acompañan el pie.","video":"https://youtube.com/shorts/WJTZITFrNwM"}
  ]'::jsonb
)
on conflict (alumna_id, semana, dia) do update set ejercicios = excluded.ejercicios;

-- PASO 5: Insertar Día 3 — Core + tren inferior + hombros y brazos
insert into rutinas (alumna_id, semana, dia, ejercicios)
values (
  1000001, 1, 3,
  '[
    {"nombre":"Plancha sube y baja","series":"3","reps":"10","tip":"Mantené el cuerpo alineado, evitá mover la cadera.","video":"https://youtube.com/shorts/LpNOvHTpoD0"},
    {"nombre":"Plancha lateral oblicua","series":"3","reps":"10","tip":"Elevá la cadera activando oblicuos, no dejes caer el cuerpo.","video":"https://youtube.com/shorts/1wdI98u-5N0"},
    {"nombre":"Isquiotibial","series":"3","reps":"10","tip":"Controlá la bajada, sentí el trabajo en la parte posterior.","video":"https://youtube.com/shorts/B6t8MvbTtew"},
    {"nombre":"Sentadilla abro y cierro con banda","series":"3","reps":"12","tip":"Mantené tensión constante en la banda.","video":"https://youtube.com/shorts/tv3vclkcrhE"},
    {"nombre":"Cuádriceps a dos piernas","series":"3","reps":"10","tip":"Movimiento controlado, sin impulso.","video":"https://youtube.com/shorts/eib0q1aVnv4"},
    {"nombre":"Elevación de cadera con pierna extendida","series":"3","reps":"10","tip":"Empujá con el talón y activá glúteo, no arquees la espalda.","video":"https://youtube.com/shorts/qyydthVn9Qs"},
    {"nombre":"Press de hombros con máquina","series":"3","reps":"10","tip":"Evitá arquear la espalda, controlá el movimiento.","video":"https://youtube.com/shorts/0oXFHxf1sRc"},
    {"nombre":"Tríceps","series":"3","reps":"10","tip":"Codos estables a 90°, movimiento controlado.","video":"https://youtube.com/shorts/K2smm4Oohpw"},
    {"nombre":"Vuelos laterales","series":"3","reps":"10","tip":"No subas más allá de los hombros, sin balanceo.","video":"https://youtube.com/shorts/VbS0cyfH2mk"}
  ]'::jsonb
)
on conflict (alumna_id, semana, dia) do update set ejercicios = excluded.ejercicios;

-- PASO 6: Verificar que quedó bien
select
  a.nombre,
  r.semana,
  r.dia,
  jsonb_array_length(r.ejercicios) as cantidad_ejercicios
from rutinas r
join alumnas a on a.id = r.alumna_id
where a.slug = 'maria'
order by r.semana, r.dia;

-- Resultado esperado:
-- María González | 1 | 1 | 8
-- María González | 1 | 2 | 9
-- María González | 1 | 3 | 9

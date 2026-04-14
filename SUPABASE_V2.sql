-- ============================================================
-- AMIRA FITNESS v2 — SQL COMPLETO
-- Ejecutar en Supabase → SQL Editor → New query → Run
-- ============================================================

-- ── TABLAS EXISTENTES (mantener) ────────────────────────────

-- Si ya las tenés creadas, este bloque no las rompe
create table if not exists alumnas (
  id bigint primary key,
  nombre text not null,
  slug text unique not null,
  tipo text default 'gym',
  dias int default 3,
  notas text,
  color text default 'teal',
  foto text,
  tel text,
  ciclo_actual int default 1,
  created_at timestamptz default now()
);

create table if not exists comentarios (
  id bigint primary key generated always as identity,
  alumna_id bigint references alumnas(id) on delete cascade,
  ciclo int default 1,
  semana int not null,
  dia int not null,
  texto text not null,
  fecha text,
  created_at timestamptz default now()
);

create table if not exists registros (
  id bigint primary key,
  nombre text, tel text, mail text, ubicacion text,
  objetivos text, modalidad text, dias text,
  lesiones text, exp text, extra text,
  fecha text, estado text default 'pendiente',
  created_at timestamptz default now()
);

-- ── NUEVAS TABLAS ────────────────────────────────────────────

-- BIBLIOTECA DE EJERCICIOS
-- Un ejercicio existe una sola vez acá, con toda su info técnica
create table if not exists ejercicios_biblioteca (
  id bigint primary key generated always as identity,
  nombre text not null,
  descripcion text,
  video text,
  grupo_muscular text,
  tipo text, -- 'fuerza', 'core', 'movilidad', 'cardio', etc.
  observaciones text,
  created_at timestamptz default now()
);

-- PLANTILLAS DE RUTINA
-- Una semana completa pre-armada que se puede asignar a cualquier alumna
create table if not exists plantillas (
  id bigint primary key generated always as identity,
  nombre text not null, -- Ej: "Gym 3 días principiante"
  descripcion text,
  dias int default 3,
  tipo text, -- 'gym', 'distancia', 'pilates', etc.
  estructura jsonb default '{}',
  -- estructura: { "1": [{ejercicio_id, series, reps, tip}, ...], "2": [...], "3": [...] }
  created_at timestamptz default now()
);

-- RUTINAS POR CICLO
-- Ahora cada rutina pertenece a un ciclo, no solo a semana/día
create table if not exists rutinas (
  id bigint primary key generated always as identity,
  alumna_id bigint references alumnas(id) on delete cascade,
  ciclo int default 1,
  semana int not null,
  dia int not null,
  ejercicios jsonb default '[]',
  -- ejercicios: [{ejercicio_id, nombre, series, reps, tip, video, grupo_muscular}, ...]
  -- guardamos nombre/video también para no depender de joins en la app
  updated_at timestamptz default now(),
  unique(alumna_id, ciclo, semana, dia)
);

-- PROGRESO POR CICLO
-- Los checks y pesos ahora incluyen el ciclo
create table if not exists progreso (
  id bigint primary key generated always as identity,
  alumna_id bigint references alumnas(id) on delete cascade,
  ciclo int default 1,
  semana int not null,
  dia int not null,
  ejercicio_idx int not null,
  hecho boolean default false,
  peso_kg numeric(5,1),
  fecha_registro timestamptz default now(),
  unique(alumna_id, ciclo, semana, dia, ejercicio_idx)
);

-- ── RLS POLICIES ─────────────────────────────────────────────

alter table alumnas enable row level security;
alter table rutinas enable row level security;
alter table comentarios enable row level security;
alter table registros enable row level security;
alter table ejercicios_biblioteca enable row level security;
alter table plantillas enable row level security;
alter table progreso enable row level security;

-- Limpiar policies existentes si las hay
drop policy if exists "public all alumnas" on alumnas;
drop policy if exists "public all rutinas" on rutinas;
drop policy if exists "public all comentarios" on comentarios;
drop policy if exists "public all registros" on registros;

create policy "public all alumnas" on alumnas for all using (true) with check (true);
create policy "public all rutinas" on rutinas for all using (true) with check (true);
create policy "public all comentarios" on comentarios for all using (true) with check (true);
create policy "public all registros" on registros for all using (true) with check (true);
create policy "public all biblioteca" on ejercicios_biblioteca for all using (true) with check (true);
create policy "public all plantillas" on plantillas for all using (true) with check (true);
create policy "public all progreso" on progreso for all using (true) with check (true);

-- ── DATOS INICIALES: Biblioteca de ejercicios ────────────────

insert into ejercicios_biblioteca (nombre, descripcion, video, grupo_muscular, tipo) values
('Hollow Hold', 'Espalda baja siempre apoyada. Si se despega, flexioná rodillas.', 'https://youtube.com/shorts/o-XW-38ni2s', 'Core', 'core'),
('Crunch sobre esfera', 'Movimiento controlado, no tires del cuello. Activá abdomen.', 'https://youtube.com/shorts/4sORVXlsRog', 'Core', 'core'),
('Plancha con toque de hombros', 'Evitá que la cadera se mueva. Activá abdomen.', 'https://youtube.com/shorts/tzOH2YzP8QI', 'Core', 'core'),
('Cuádriceps a una pierna', 'Movimiento controlado, sin impulso. SIN CARGA.', 'https://youtube.com/shorts/AcnKSxfj4ng', 'Piernas', 'fuerza'),
('Sentadilla al cajón', 'Bajá controlado, peso en talones.', 'https://youtube.com/shorts/ASCwv9H6A4U', 'Piernas', 'fuerza'),
('Isquiotibiales', 'Poca carga. Subí y bajá de manera controlada.', 'https://youtube.com/shorts/B6t8MvbTtew', 'Piernas', 'fuerza'),
('Vuelos laterales', 'No subas más allá de los hombros.', 'https://youtube.com/shorts/VbS0cyfH2mk', 'Hombros', 'fuerza'),
('Vuelos frontales', 'Movimiento controlado, sin balanceo.', 'https://youtube.com/shorts/YyWAmeBkVgg', 'Hombros', 'fuerza'),
('Russian Twist', 'Movimiento lento, girá desde el torso, no solo brazos.', 'https://youtube.com/shorts/z9Kgzjr16WY', 'Core', 'core'),
('Ruedita (ab wheel)', 'Mantené abdomen activo, no dejes caer la zona lumbar.', 'https://youtube.com/shorts/6gGMYiw4__c', 'Core', 'core'),
('Dead Bug', 'Espalda baja apoyada, movimiento controlado.', 'https://youtube.com/shorts/5HtD6fZEc60', 'Core', 'core'),
('Remo cerrado', 'Llevá los codos hacia atrás, no encoges hombros.', 'https://youtube.com/shorts/jyNOv953lnM', 'Espalda', 'fuerza'),
('Press de pecho', 'Controlá la bajada, no bloquees codos arriba.', 'https://youtube.com/shorts/DfzDjXCO2Nw', 'Pecho', 'fuerza'),
('Abductor', 'Movimiento controlado, sin impulso.', 'https://youtube.com/shorts/xlp6FYwBFLU', 'Glúteos', 'fuerza'),
('Patada de glúteo', 'No arquees la espalda, movimiento desde el glúteo.', 'https://youtube.com/shorts/GvgL2NbOaKE', 'Glúteos', 'fuerza'),
('Bíceps con mancuernas', 'Evitá balanceo, codos fijos pegados a las costillas.', 'https://youtube.com/shorts/jzCZyceISsY', 'Brazos', 'fuerza'),
('Sentadilla común', 'Peso en talones, rodillas acompañan el pie.', 'https://youtube.com/shorts/WJTZITFrNwM', 'Piernas', 'fuerza'),
('Plancha sube y baja', 'Mantené el cuerpo alineado, evitá mover la cadera.', 'https://youtube.com/shorts/LpNOvHTpoD0', 'Core', 'core'),
('Plancha lateral oblicua', 'Elevá la cadera activando oblicuos, no dejes caer el cuerpo.', 'https://youtube.com/shorts/1wdI98u-5N0', 'Core', 'core'),
('Sentadilla abro y cierro con banda', 'Mantené tensión constante en la banda.', 'https://youtube.com/shorts/tv3vclkcrhE', 'Piernas', 'fuerza'),
('Cuádriceps a dos piernas', 'Movimiento controlado, sin impulso.', 'https://youtube.com/shorts/eib0q1aVnv4', 'Piernas', 'fuerza'),
('Elevación de cadera con pierna extendida', 'Empujá con el talón y activá glúteo, no arquees la espalda.', 'https://youtube.com/shorts/qyydthVn9Qs', 'Glúteos', 'fuerza'),
('Press de hombros con máquina', 'Evitá arquear la espalda, controlá el movimiento.', 'https://youtube.com/shorts/0oXFHxf1sRc', 'Hombros', 'fuerza'),
('Tríceps', 'Codos estables a 90°, movimiento controlado.', 'https://youtube.com/shorts/K2smm4Oohpw', 'Brazos', 'fuerza')
on conflict do nothing;

-- ── PLANTILLA INICIAL: Rutina de María (3 días gym) ──────────

insert into plantillas (nombre, descripcion, dias, tipo, estructura) values (
  'Gym 3 días — Principiante',
  'Rutina completa de 3 días para gimnasio. Tren inferior, superior y full body con core.',
  3,
  'gym',
  '{
    "1": [
      {"nombre":"Hollow Hold","series":"3","reps":"20-30\"","tip":"Espalda baja siempre apoyada.","video":"https://youtube.com/shorts/o-XW-38ni2s","grupo":"Core"},
      {"nombre":"Crunch sobre esfera","series":"3","reps":"15","tip":"No tires del cuello.","video":"https://youtube.com/shorts/4sORVXlsRog","grupo":"Core"},
      {"nombre":"Plancha con toque de hombros","series":"3","reps":"20","tip":"Evitá que la cadera se mueva.","video":"https://youtube.com/shorts/tzOH2YzP8QI","grupo":"Core"},
      {"nombre":"Cuádriceps a una pierna","series":"3","reps":"10 c/lado","tip":"Sin impulso, sin carga.","video":"https://youtube.com/shorts/AcnKSxfj4ng","grupo":"Piernas"},
      {"nombre":"Sentadilla al cajón","series":"3","reps":"10","tip":"Bajá controlado, peso en talones.","video":"https://youtube.com/shorts/ASCwv9H6A4U","grupo":"Piernas"},
      {"nombre":"Isquiotibiales","series":"3","reps":"10","tip":"Poca carga, movimiento controlado.","video":"https://youtube.com/shorts/B6t8MvbTtew","grupo":"Piernas"},
      {"nombre":"Vuelos laterales","series":"3","reps":"10","tip":"No subas más allá de los hombros.","video":"https://youtube.com/shorts/VbS0cyfH2mk","grupo":"Hombros"},
      {"nombre":"Vuelos frontales","series":"3","reps":"10","tip":"Sin balanceo.","video":"https://youtube.com/shorts/YyWAmeBkVgg","grupo":"Hombros"}
    ],
    "2": [
      {"nombre":"Russian Twist","series":"3","reps":"16","tip":"Girá desde el torso, no los brazos.","video":"https://youtube.com/shorts/z9Kgzjr16WY","grupo":"Core"},
      {"nombre":"Ruedita (ab wheel)","series":"3","reps":"10","tip":"No dejes caer la zona lumbar.","video":"https://youtube.com/shorts/6gGMYiw4__c","grupo":"Core"},
      {"nombre":"Dead Bug","series":"3","reps":"8 c/lado","tip":"Espalda pegada al piso.","video":"https://youtube.com/shorts/5HtD6fZEc60","grupo":"Core"},
      {"nombre":"Remo cerrado","series":"3","reps":"10","tip":"Codos hacia atrás, no encorves hombros.","video":"https://youtube.com/shorts/jyNOv953lnM","grupo":"Espalda"},
      {"nombre":"Press de pecho","series":"3","reps":"10","tip":"Controlá la bajada.","video":"https://youtube.com/shorts/DfzDjXCO2Nw","grupo":"Pecho"},
      {"nombre":"Abductor","series":"3","reps":"10-12","tip":"Sin impulso.","video":"https://youtube.com/shorts/xlp6FYwBFLU","grupo":"Glúteos"},
      {"nombre":"Patada de glúteo","series":"3","reps":"10","tip":"No arquees la espalda.","video":"https://youtube.com/shorts/GvgL2NbOaKE","grupo":"Glúteos"},
      {"nombre":"Bíceps con mancuernas","series":"3","reps":"10","tip":"Codos fijos a las costillas.","video":"https://youtube.com/shorts/jzCZyceISsY","grupo":"Brazos"},
      {"nombre":"Sentadilla común","series":"3","reps":"12","tip":"Peso en talones.","video":"https://youtube.com/shorts/WJTZITFrNwM","grupo":"Piernas"}
    ],
    "3": [
      {"nombre":"Plancha sube y baja","series":"3","reps":"10","tip":"Cuerpo alineado, sin mover la cadera.","video":"https://youtube.com/shorts/LpNOvHTpoD0","grupo":"Core"},
      {"nombre":"Plancha lateral oblicua","series":"3","reps":"10","tip":"Elevá la cadera activando oblicuos.","video":"https://youtube.com/shorts/1wdI98u-5N0","grupo":"Core"},
      {"nombre":"Isquiotibiales","series":"3","reps":"10","tip":"Sentí el trabajo posterior.","video":"https://youtube.com/shorts/B6t8MvbTtew","grupo":"Piernas"},
      {"nombre":"Sentadilla abro y cierro con banda","series":"3","reps":"12","tip":"Tensión constante en la banda.","video":"https://youtube.com/shorts/tv3vclkcrhE","grupo":"Piernas"},
      {"nombre":"Cuádriceps a dos piernas","series":"3","reps":"10","tip":"Sin impulso.","video":"https://youtube.com/shorts/eib0q1aVnv4","grupo":"Piernas"},
      {"nombre":"Elevación de cadera con pierna extendida","series":"3","reps":"10","tip":"Empujá con el talón, activá glúteo.","video":"https://youtube.com/shorts/qyydthVn9Qs","grupo":"Glúteos"},
      {"nombre":"Press de hombros con máquina","series":"3","reps":"10","tip":"No arquees la espalda.","video":"https://youtube.com/shorts/0oXFHxf1sRc","grupo":"Hombros"},
      {"nombre":"Tríceps","series":"3","reps":"10","tip":"Codos estables a 90°.","video":"https://youtube.com/shorts/K2smm4Oohpw","grupo":"Brazos"},
      {"nombre":"Vuelos laterales","series":"3","reps":"10","tip":"No subas más allá de los hombros.","video":"https://youtube.com/shorts/VbS0cyfH2mk","grupo":"Hombros"}
    ]
  }'::jsonb
) on conflict do nothing;

-- ── MIGRAR RUTINAS EXISTENTES AL MODELO CON CICLO ───────────
-- Si ya tenías rutinas sin la columna ciclo, esto las pone en ciclo 1
update rutinas set ciclo = 1 where ciclo is null;

-- ── VERIFICAR ────────────────────────────────────────────────
select 'Biblioteca' as tabla, count(*) as registros from ejercicios_biblioteca
union all
select 'Plantillas', count(*) from plantillas
union all
select 'Alumnas', count(*) from alumnas
union all
select 'Rutinas', count(*) from rutinas;

-- Resultado esperado:
-- Biblioteca | 24
-- Plantillas | 1
-- Alumnas    | (las que tengas)
-- Rutinas    | (las que tengas)

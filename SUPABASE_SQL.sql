-- PASO 1: Ejecutar este SQL en Supabase → SQL Editor → New query → Run

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
  created_at timestamptz default now()
);

create table if not exists rutinas (
  id bigint primary key generated always as identity,
  alumna_id bigint references alumnas(id) on delete cascade,
  semana int not null,
  dia int not null,
  ejercicios jsonb default '[]',
  updated_at timestamptz default now(),
  unique(alumna_id, semana, dia)
);

create table if not exists comentarios (
  id bigint primary key generated always as identity,
  alumna_id bigint references alumnas(id) on delete cascade,
  semana int not null,
  dia int not null,
  texto text not null,
  fecha text,
  created_at timestamptz default now()
);

create table if not exists registros (
  id bigint primary key,
  nombre text,
  tel text,
  mail text,
  ubicacion text,
  objetivos text,
  modalidad text,
  dias text,
  lesiones text,
  exp text,
  extra text,
  fecha text,
  estado text default 'pendiente',
  created_at timestamptz default now()
);

-- Habilitar acceso público (necesario para que la app funcione)
alter table alumnas enable row level security;
alter table rutinas enable row level security;
alter table comentarios enable row level security;
alter table registros enable row level security;

create policy "public all alumnas" on alumnas for all using (true) with check (true);
create policy "public all rutinas" on rutinas for all using (true) with check (true);
create policy "public all comentarios" on comentarios for all using (true) with check (true);
create policy "public all registros" on registros for all using (true) with check (true);

-- PASO 2: Cargar la rutina de María (opcional — ya está en el panel)
-- Si preferís cargarla desde el panel, saltá este paso.

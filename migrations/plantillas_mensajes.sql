-- Plantillas de WhatsApp del panel en la base. Aplicada el 13/10/2026.
--
-- Amira usa el panel en el celular y en la compu, y hasta ahora cada dispositivo
-- guardaba sus propios textos en localStorage ('af-alumna-tpls' y 'af-tpls'): lo
-- que editaba en uno no aparecia en el otro. Una fila por conjunto con la lista
-- completa, tal como la guarda el panel ("alumna": las de la ficha de cada
-- alumna; "general": las del envio a varias).
--
-- Nace con RLS y solo Amira la puede leer o cambiar, como contactos.
-- Marcha atras: drop table public.plantillas_mensajes; (el panel vuelve a usar
-- lo que tiene cada dispositivo).

create table if not exists public.plantillas_mensajes (
  conjunto   text primary key check (conjunto in ('alumna','general')),
  datos      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.plantillas_mensajes enable row level security;

drop policy if exists plantillas_mensajes_admin on public.plantillas_mensajes;
create policy plantillas_mensajes_admin on public.plantillas_mensajes for all
  using (auth.email() = 'amiralezcano@gmail.com')
  with check (auth.email() = 'amiralezcano@gmail.com');

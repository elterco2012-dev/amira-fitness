-- Notas privadas de Amira e historial de pausas y bajas (14/10/2026).
-- Estaban en alumnas, y cada alumna lee su propia fila con su sesión: 3 podían ver
-- las notas privadas que Amira escribió sobre ellas y 19 el historial de sus pausas y
-- bajas, con el motivo y la nota de Amira. Pasan a una tabla que solo ve Amira.
--
-- Las columnas viejas de alumnas no se borran: quedan vacías. Un panel abierto desde
-- antes del cambio todavía puede escribir ahí; el trigger alumnas_sin_privado lo pasa a
-- la tabla nueva y lo saca de la fila de la alumna, sin errores.
-- Sin "drop": la herramienta de Supabase frena las órdenes que borran.
-- Marcha atrás: alumnas_privado_marcha_atras.sql

create table if not exists public.alumnas_privado (
  alumna_id bigint primary key references public.alumnas(id) on delete cascade,
  notas_privadas text,
  estado_log jsonb not null default '[]'::jsonb
);
alter table public.alumnas_privado enable row level security;
create policy alumnas_privado_admin on public.alumnas_privado for all
  using (auth.email() = 'amiralezcano@gmail.com')
  with check (auth.email() = 'amiralezcano@gmail.com');

insert into public.alumnas_privado (alumna_id, notas_privadas, estado_log)
select id, nullif(trim(notas_privadas), ''),
       case when jsonb_typeof(estado_log) = 'array' then estado_log else '[]'::jsonb end
  from public.alumnas
 where coalesce(trim(notas_privadas), '') <> ''
    or (jsonb_typeof(estado_log) = 'array' and jsonb_array_length(estado_log) > 0)
on conflict (alumna_id) do nothing;

create or replace function public.alumnas_sin_privado()
returns trigger
language plpgsql security definer set search_path = public
as $$
declare
  entradas jsonb;
begin
  entradas := case when jsonb_typeof(new.estado_log) = 'array' then new.estado_log else '[]'::jsonb end;
  if coalesce(trim(new.notas_privadas), '') <> '' or jsonb_array_length(entradas) > 0 then
    insert into alumnas_privado as p (alumna_id, notas_privadas, estado_log)
    values (new.id, nullif(trim(new.notas_privadas), ''), entradas)
    on conflict (alumna_id) do update set
      notas_privadas = coalesce(excluded.notas_privadas, p.notas_privadas),
      -- Se suman las entradas que falten: el panel viejo pudo cargar el historial
      -- antes o después del cambio.
      estado_log = p.estado_log || coalesce((
        select jsonb_agg(e) from jsonb_array_elements(excluded.estado_log) e
         where not p.estado_log @> jsonb_build_array(e)), '[]'::jsonb);
    new.notas_privadas := null;
    new.estado_log := '[]'::jsonb;
  end if;
  return new;
end $$;

create or replace trigger alumnas_sin_privado before update on public.alumnas
  for each row execute function public.alumnas_sin_privado();

update public.alumnas set notas_privadas = null, estado_log = '[]'::jsonb
 where coalesce(trim(notas_privadas), '') <> ''
    or jsonb_typeof(estado_log) is distinct from 'array'
    or jsonb_array_length(estado_log) > 0;

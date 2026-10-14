-- Ficha de salud (14/10/2026): lo que se puede hacer sin haber ingresado, solo con el
-- link de la ficha (/ficha/<slug>, y el slug es el nombre de la alumna).
--
-- 1. ficha_alumna ya no da la edad: la columna queda, siempre vacía, para no tener que
--    borrar la función. El PIN de ingreso es la fecha de nacimiento: con la edad
--    quedaba en unas 730 combinaciones en vez de 18.000.
-- 2. ficha_guardar no cambia un teléfono que ya estaba cargado: cualquiera con el
--    link podía desviar a otro número los mensajes de Amira (cobros, salud).
-- 3. Una ficha o inscripción enviada sin sesión entra siempre como pendiente. Antes
--    podía entrar como aprobada, para cualquier alumna, sin que Amira la revisara.
--    La ficha de una alumna existente ahora la aprueba Amira desde Registros.
--
-- Sin "drop": la herramienta de Supabase frena las órdenes que borran y pide
-- confirmación, y el cambio se corta.
-- Falta (siguiente paso): que el link de la ficha lleve un código de un solo uso,
-- para que no alcance con saber el nombre.
-- Marcha atrás: ficha_sin_edad_y_pendiente_marcha_atras.sql

create or replace function public.ficha_alumna(p_slug text)
returns table(id bigint, nombre text, tipo text, edad int, tiene_email boolean, tiene_tel boolean)
language sql stable security definer set search_path = public
as $$
  select a.id, a.nombre, a.tipo,
         null::int,
         coalesce(trim(a.email),'') <> '',
         coalesce(trim(a.tel),'') <> ''
    from alumnas a
   where a.slug = p_slug
   limit 1;
$$;

create or replace function public.ficha_guardar(p_slug text, p_lesiones text, p_tel text)
returns void
language sql volatile security definer set search_path = public
as $$
  update alumnas
     set lesiones = coalesce(nullif(trim(p_lesiones),''), lesiones),
         tel      = case when coalesce(trim(tel),'') = '' then nullif(trim(p_tel),'') else tel end
   where slug = p_slug;
$$;

alter policy registros_inscripcion on registros
  with check (tipo in ('registro','ficha_salud') and estado = 'pendiente');

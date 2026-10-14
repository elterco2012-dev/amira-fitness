-- Marcha atrás de ficha_sin_edad_y_pendiente.sql: vuelve a como estaba el 13/10/2026.
-- Solo para una emergencia: deja otra vez la edad visible y el teléfono modificable
-- sin sesión.

create or replace function public.ficha_alumna(p_slug text)
returns table(id bigint, nombre text, tipo text, edad int, tiene_email boolean, tiene_tel boolean)
language sql stable security definer set search_path = public
as $$
  select a.id, a.nombre, a.tipo,
         case when a.nacimiento ~ '^\d{4}-\d{2}-\d{2}$'
              then extract(year from age(current_date, a.nacimiento::date))::int end,
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
         tel      = coalesce(nullif(trim(p_tel),''), tel)
   where slug = p_slug;
$$;

alter policy registros_inscripcion on registros
  with check (tipo in ('registro','ficha_salud') and estado in ('pendiente','aprobado'));

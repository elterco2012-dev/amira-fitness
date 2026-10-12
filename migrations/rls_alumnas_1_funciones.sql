-- Cierre de permisos de alumnas y comentarios, parte 1 de 2.
-- Esta parte no cambia ningun permiso: deja listo lo que van a usar las paginas
-- que hoy leen la tabla de alumnas sin haber ingresado. Aplicada el 12/10/2026.

-- Emails en minuscula y sin espacios. 7 fichas tenian alguna mayuscula y el
-- usuario de ingreso no; la regla de permisos compara sin mayusculas, pero asi
-- la app de la alumna tambien la encuentra por email sin depender del slug.
update alumnas set email = lower(trim(email))
 where email is not null and email <> lower(trim(email));

-- Al crear el PIN, la app verifica que el email sea de una alumna. Antes leia la
-- tabla sin haber ingresado; ahora solo puede saber si/no.
create or replace function public.alumna_registrada(p_email text)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists(select 1 from alumnas where lower(trim(email)) = lower(trim(p_email)));
$$;

-- La ficha de salud se abre con un link, sin haber ingresado. Antes leia la fila
-- completa de la alumna, incluida la fecha de nacimiento, que es su PIN de
-- ingreso. Ahora recibe solo lo que necesita para precargar el formulario.
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

-- Al enviar la ficha, actualiza solo lesiones y telefono de esa alumna, como
-- hacia antes, pero sin poder tocar ninguna otra columna ni otra alumna.
create or replace function public.ficha_guardar(p_slug text, p_lesiones text, p_tel text)
returns void
language sql volatile security definer set search_path = public
as $$
  update alumnas
     set lesiones = coalesce(nullif(trim(p_lesiones),''), lesiones),
         tel      = coalesce(nullif(trim(p_tel),''), tel)
   where slug = p_slug;
$$;

revoke all on function public.alumna_registrada(text) from public;
revoke all on function public.ficha_alumna(text) from public;
revoke all on function public.ficha_guardar(text, text, text) from public;
grant execute on function public.alumna_registrada(text) to anon, authenticated;
grant execute on function public.ficha_alumna(text) to anon, authenticated;
grant execute on function public.ficha_guardar(text, text, text) to anon, authenticated;

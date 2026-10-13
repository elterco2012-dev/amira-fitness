-- Cierre de permisos de las tablas que quedaban abiertas (13/10/2026). Se aplica
-- a mano en el SQL Editor de Supabase; antes, probarla en una transaccion.
-- Hasta aca cualquiera con la clave publica del sitio podia leer, modificar y
-- borrar estas tablas. Ademas, cualquier cuenta con sesion (incluidas dos que no
-- son de ninguna alumna) podia leer todos los reportes de las alumnas y publicar
-- avisos, y cada alumna podia cambiar cualquier dato de su ficha.
--
-- Despues de esto:
--   peso_alumna            Amira: todo. Alumna: lo suyo.
--   push_subscriptions     Amira: todo. Alumna: lo suyo. Activar las notificaciones
--                          pasa por guardar_suscripcion (ver abajo).
--   feedbacks              Amira: todo. Alumna: leer y crear los suyos. No puede
--                          editarlos ni borrarlos: Amira los marca como atendidos.
--   avisos                 Amira: todo. Alumna: leer los avisos para todas y los suyos.
--   ejercicios_biblioteca  Amira: todo. Cualquiera: leer. No tiene datos personales
--                          y la app de la alumna la usa.
--   plantillas, pesos,
--   fichas_salud           Solo Amira. pesos y fichas_salud estan vacias y sin uso.
--   page_views             Cualquiera: registrar una visita. Solo Amira: leerlas.
--   alumnas                Cada alumna solo puede cambiar de su fila lo que la app
--                          cambia: ultima actividad, foto y dias de entrenamiento.
-- Las Edge Functions usan la clave de servicio y no se ven afectadas.

-- peso_alumna ---------------------------------------------------------------
drop policy if exists peso_own        on peso_alumna;
drop policy if exists peso_alumna_own on peso_alumna;
-- peso_admin (Amira, todo) se mantiene.
create policy peso_alumna_own on peso_alumna for all to authenticated
  using (alumna_id in (select id from alumnas where lower(email) = lower(auth.email())))
  with check (alumna_id in (select id from alumnas where lower(email) = lower(auth.email())));

-- pesos y fichas_salud (vacias, sin uso) -------------------------------------
drop policy if exists "allow all"  on pesos;
drop policy if exists pesos_admin  on pesos;
create policy pesos_admin on pesos for all
  using (auth.email() = 'amiralezcano@gmail.com')
  with check (auth.email() = 'amiralezcano@gmail.com');

drop policy if exists fichas_all         on fichas_salud;
drop policy if exists fichas_salud_admin on fichas_salud;
create policy fichas_salud_admin on fichas_salud for all
  using (auth.email() = 'amiralezcano@gmail.com')
  with check (auth.email() = 'amiralezcano@gmail.com');

-- plantillas y ejercicios_biblioteca ----------------------------------------
drop policy if exists "public all plantillas" on plantillas;
-- plantillas_admin (Amira, todo) se mantiene.
drop policy if exists "public all biblioteca" on ejercicios_biblioteca;
-- biblioteca_admin (Amira, todo) y biblioteca_read (leer) se mantienen.

-- push_subscriptions --------------------------------------------------------
drop policy if exists push_own    on push_subscriptions;
drop policy if exists push_admin  on push_subscriptions;
drop policy if exists push_alumna on push_subscriptions;
create policy push_admin on push_subscriptions for all
  using (auth.email() = 'amiralezcano@gmail.com')
  with check (auth.email() = 'amiralezcano@gmail.com');
create policy push_alumna on push_subscriptions for all to authenticated
  using (alumna_id in (select id from alumnas where lower(email) = lower(auth.email())))
  with check (alumna_id in (select id from alumnas where lower(email) = lower(auth.email())));

-- Un celular tiene una sola suscripcion. Si en ese celular ya habia entrado otra
-- alumna, la fila es de ella y la nueva no la puede ver ni modificar. Esta funcion
-- se la pasa a quien activa las notificaciones, como pasaba antes del cierre.
create or replace function public.guardar_suscripcion(p_alumna_id bigint, p_endpoint text, p_p256dh text, p_auth text)
returns boolean
language plpgsql volatile security definer set search_path = public
as $$
begin
  if coalesce(p_endpoint, '') = '' or not exists (
       select 1 from alumnas where id = p_alumna_id and lower(email) = lower(auth.email())) then
    return false;
  end if;
  insert into push_subscriptions (alumna_id, endpoint, p256dh, auth)
  values (p_alumna_id, p_endpoint, p_p256dh, p_auth)
  on conflict (endpoint) do update
    set alumna_id = excluded.alumna_id, p256dh = excluded.p256dh, auth = excluded.auth;
  return true;
end $$;
revoke all on function public.guardar_suscripcion(bigint, text, text, text) from public, anon;
grant execute on function public.guardar_suscripcion(bigint, text, text, text) to authenticated;

-- feedbacks -----------------------------------------------------------------
drop policy if exists feedbacks_insert               on feedbacks;
drop policy if exists feedbacks_select_authenticated on feedbacks;
drop policy if exists feedbacks_alumna_read          on feedbacks;
drop policy if exists feedbacks_alumna_insert        on feedbacks;
-- feedbacks_admin (Amira, todo) se mantiene.
create policy feedbacks_alumna_read on feedbacks for select to authenticated
  using (alumna_id in (select id from alumnas where lower(email) = lower(auth.email())));
create policy feedbacks_alumna_insert on feedbacks for insert to authenticated
  with check (alumna_id in (select id from alumnas where lower(email) = lower(auth.email())));

-- avisos --------------------------------------------------------------------
drop policy if exists avisos_write       on avisos;
drop policy if exists avisos_read        on avisos;
drop policy if exists avisos_admin       on avisos;
drop policy if exists avisos_alumna_read on avisos;
create policy avisos_admin on avisos for all
  using (auth.email() = 'amiralezcano@gmail.com')
  with check (auth.email() = 'amiralezcano@gmail.com');
create policy avisos_alumna_read on avisos for select to authenticated
  using (para = 'todas' or para in (select slug from alumnas where lower(email) = lower(auth.email())));

-- page_views ----------------------------------------------------------------
drop policy if exists "select anon"          on page_views;
drop policy if exists "select authenticated" on page_views;
drop policy if exists page_views_admin       on page_views;
-- "insert anon" (registrar una visita) se mantiene.
create policy page_views_admin on page_views for select
  using (auth.email() = 'amiralezcano@gmail.com');

-- alumnas: que puede cambiar cada alumna de su fila --------------------------
-- alumnas_self_write deja que cada alumna actualice su fila, pero sin este
-- control podia cambiar cualquier columna: nombre, lesiones, nivel, estado. El
-- nombre se muestra en el panel de Amira. Las funciones security definer (la
-- ficha) corren como su duenio y no pasan por aca; Amira y las Edge Functions
-- tampoco.
create or replace function public.alumnas_limitar_cambios()
returns trigger
language plpgsql set search_path = public
as $$
begin
  if current_user = 'authenticated'
     and auth.email() is distinct from 'amiralezcano@gmail.com'
     and (to_jsonb(new) - array['last_active_at','foto','dias_disponibles'])
         is distinct from (to_jsonb(old) - array['last_active_at','foto','dias_disponibles']) then
    raise exception 'Desde la app solo se pueden cambiar la foto y los dias de entrenamiento';
  end if;
  return new;
end $$;
drop trigger if exists alumnas_limitar_cambios on alumnas;
create trigger alumnas_limitar_cambios before update on alumnas
  for each row execute function public.alumnas_limitar_cambios();

-- Cierre de permisos de rutinas y progreso. Aplicada el 12/10/2026.
-- Hasta aca cualquiera con la clave publica del sitio podia leer, modificar y
-- borrar todas las rutinas y todo el historial de entrenamiento.
--
-- Despues de esto:
--   rutinas   Amira: todo (rutinas_admin). Alumna con sesion: solo leer las suyas.
--   progreso  Amira: todo (progreso_admin). Alumna con sesion: leer y guardar los suyos.
--   Sin sesion: nada. Ninguna pagina previa al ingreso usa estas tablas.
-- El generador de rutinas usa la clave de servicio y no se ve afectado. El
-- service worker no escribe: le avisa a la app abierta que sincronice.

-- rutinas -------------------------------------------------------------------
drop policy if exists "public all rutinas"    on rutinas;
drop policy if exists "public write rutinas"  on rutinas;
drop policy if exists "Public delete rutinas" on rutinas;
drop policy if exists "Public insert rutinas" on rutinas;
drop policy if exists "Public select rutinas" on rutinas;
drop policy if exists "public read rutinas"   on rutinas;
drop policy if exists "Public update rutinas" on rutinas;
drop policy if exists rutinas_anon_read       on rutinas;
drop policy if exists rutinas_alumna_read     on rutinas;
-- rutinas_admin (Amira, todo) se mantiene.
create policy rutinas_alumna_read on rutinas for select to authenticated
  using (alumna_id in (select id from alumnas where lower(email) = lower(auth.email())));

-- progreso ------------------------------------------------------------------
drop policy if exists "allow all progreso"  on progreso;
drop policy if exists progreso_own          on progreso;
drop policy if exists "public all progreso" on progreso;
-- progreso_admin (Amira, todo) se mantiene.
create policy progreso_alumna on progreso for all to authenticated
  using (alumna_id in (select id from alumnas where lower(email) = lower(auth.email())))
  with check (alumna_id in (select id from alumnas where lower(email) = lower(auth.email())));

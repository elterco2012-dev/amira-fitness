-- Marcha atras de emergencia de rls_ultimas_tablas_permisos.sql: vuelve a abrir
-- estas tablas como estaban antes del 13/10/2026. Solo si algo deja de funcionar,
-- y de ser posible solo la parte de la tabla con problemas.
-- No borra guardar_suscripcion: la app la usa para activar las notificaciones.

-- peso_alumna
create policy peso_own on peso_alumna for all using (true) with check (true);
-- pesos y fichas_salud
create policy "allow all" on pesos for all using (true) with check (true);
create policy fichas_all on fichas_salud for all to authenticated using (true) with check (true);
-- plantillas y ejercicios_biblioteca
create policy "public all plantillas" on plantillas for all using (true) with check (true);
create policy "public all biblioteca" on ejercicios_biblioteca for all using (true) with check (true);
-- push_subscriptions
create policy push_own on push_subscriptions for all using (true) with check (true);
-- feedbacks
create policy feedbacks_insert on feedbacks for insert to anon, authenticated with check (true);
create policy feedbacks_select_authenticated on feedbacks for select to authenticated using (true);
-- avisos
create policy avisos_read on avisos for select using (true);
create policy avisos_write on avisos for all using (auth.role() = 'authenticated');
-- page_views
create policy "select anon" on page_views for select to anon using (true);
create policy "select authenticated" on page_views for select to authenticated using (true);
-- alumnas
drop trigger if exists alumnas_limitar_cambios on alumnas;

-- Marcha atras de emergencia de rls_rutinas_progreso_permisos.sql: vuelve a
-- abrir rutinas y progreso como estaban antes del 12/10/2026. Solo si algo
-- deja de funcionar.
create policy "public all rutinas"  on rutinas  for all using (true) with check (true);
create policy "public all progreso" on progreso for all using (true) with check (true);

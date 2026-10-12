-- Marcha atras de emergencia de rls_registros_permisos.sql: vuelve a abrir
-- registros como estaba antes del 12/10/2026. Solo si algo deja de funcionar.
create policy "public all registros" on registros for all using (true) with check (true);

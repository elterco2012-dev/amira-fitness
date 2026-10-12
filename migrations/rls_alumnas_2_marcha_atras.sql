-- Marcha atras de emergencia de rls_alumnas_2_permisos.sql.
-- Vuelve a abrir alumnas y comentarios como estaban antes del 12/10/2026, para
-- usar solo si algo deja de funcionar y hay que salir del paso. Despues hay que
-- averiguar que fallo y volver a cerrar.
create policy "public all alumnas" on alumnas for all using (true) with check (true);
create policy "public all comentarios" on comentarios for all using (true) with check (true);

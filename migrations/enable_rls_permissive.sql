-- RLS FASE 1: Habilitar sin romper la app
-- =========================================
-- Esto activa RLS en todas las tablas y agrega políticas que permiten
-- exactamente lo mismo que ahora (acceso total para anon).
-- La app sigue funcionando igual. La diferencia: cuando agregues Auth,
-- solo tenés que DROP estas políticas y agregar las restrictivas.
--
-- Ejecutar en Supabase: SQL Editor → New query → Run.
-- Tarda < 5 segundos. No hay downtime.

-- ── Habilitar RLS ────────────────────────────────────────────────
ALTER TABLE alumnas                ENABLE ROW LEVEL SECURITY;
ALTER TABLE rutinas                ENABLE ROW LEVEL SECURITY;
ALTER TABLE progreso               ENABLE ROW LEVEL SECURITY;
ALTER TABLE comentarios            ENABLE ROW LEVEL SECURITY;
ALTER TABLE registros              ENABLE ROW LEVEL SECURITY;
ALTER TABLE plantillas             ENABLE ROW LEVEL SECURITY;
ALTER TABLE ejercicios_biblioteca  ENABLE ROW LEVEL SECURITY;

-- ── Políticas permisivas (fase transitoria sin Auth) ─────────────
-- Lectura total para anon (necesaria para panel y alumnas)
CREATE POLICY "anon_read_alumnas"               ON alumnas               FOR SELECT USING (true);
CREATE POLICY "anon_read_rutinas"               ON rutinas               FOR SELECT USING (true);
CREATE POLICY "anon_read_progreso"              ON progreso              FOR SELECT USING (true);
CREATE POLICY "anon_read_comentarios"           ON comentarios           FOR SELECT USING (true);
CREATE POLICY "anon_read_registros"             ON registros             FOR SELECT USING (true);
CREATE POLICY "anon_read_plantillas"            ON plantillas            FOR SELECT USING (true);
CREATE POLICY "anon_read_biblioteca"            ON ejercicios_biblioteca FOR SELECT USING (true);

-- Escritura para las tablas que la app necesita desde el cliente
CREATE POLICY "anon_write_alumnas"              ON alumnas               FOR ALL    USING (true) WITH CHECK (true);
CREATE POLICY "anon_write_rutinas"              ON rutinas               FOR ALL    USING (true) WITH CHECK (true);
CREATE POLICY "anon_write_progreso"             ON progreso              FOR ALL    USING (true) WITH CHECK (true);
CREATE POLICY "anon_write_comentarios"          ON comentarios           FOR ALL    USING (true) WITH CHECK (true);
CREATE POLICY "anon_write_registros"            ON registros             FOR ALL    USING (true) WITH CHECK (true);
CREATE POLICY "anon_write_plantillas"           ON plantillas            FOR ALL    USING (true) WITH CHECK (true);
CREATE POLICY "anon_write_biblioteca"           ON ejercicios_biblioteca FOR ALL    USING (true) WITH CHECK (true);

-- ── Resultado ────────────────────────────────────────────────────
-- RLS está activo. Las políticas actuales son idénticas a no tener RLS,
-- pero ahora podés restringirlas en cualquier momento sin volver a habilitar.
--
-- FASE 2 (cuando tengas Supabase Auth):
-- DROP las políticas "anon_write_*" de las tablas sensibles
-- y reemplazalas por: USING (auth.uid()::text = alumna_id::text)

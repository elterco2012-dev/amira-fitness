-- Tabla para contar visitas a páginas públicas y clics en el link-in-bio.
-- Ejecutar en Supabase SQL Editor antes de desplegar los cambios.

CREATE TABLE IF NOT EXISTS page_views (
  id         BIGSERIAL PRIMARY KEY,
  page       TEXT NOT NULL,         -- '/', '/registro', '/bio/wa', '/bio/registro', etc.
  referrer   TEXT,                  -- de dónde vino (puede ser null)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pv_page       ON page_views(page);
CREATE INDEX IF NOT EXISTS idx_pv_created_at ON page_views(created_at DESC);

-- Permitir insertar desde el front sin autenticación (tracker anónimo)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert anon" ON page_views
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "select authenticated" ON page_views
  FOR SELECT TO authenticated USING (true);

-- También permitir lectura anon para el panel (que usa anon key)
CREATE POLICY "select anon" ON page_views
  FOR SELECT TO anon USING (true);

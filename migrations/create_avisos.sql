-- Tabla de avisos de Amira (mensajes/banners para las alumnas)
CREATE TABLE IF NOT EXISTS avisos (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  texto      TEXT NOT NULL,
  activo     BOOLEAN DEFAULT true,
  para       TEXT DEFAULT 'todas',  -- 'todas' o slug de alumna específica
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security: cualquier autenticado puede leer (alumnas necesitan ver sus avisos)
ALTER TABLE avisos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "avisos_read" ON avisos
  FOR SELECT USING (true);

CREATE POLICY "avisos_write" ON avisos
  FOR ALL USING (auth.role() = 'service_role');

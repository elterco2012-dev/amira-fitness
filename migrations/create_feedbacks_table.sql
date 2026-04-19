-- Tabla de feedbacks de alumnas: cómo les fue en el día, ejercicios problemáticos, días que no pudieron
-- Ejecutar en Supabase: SQL Editor → New query → Run

CREATE TABLE IF NOT EXISTS feedbacks (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  alumna_id  BIGINT REFERENCES alumnas(id) ON DELETE CASCADE,
  tipo       TEXT NOT NULL,
  ciclo      INT DEFAULT 1,
  semana     INT,
  dia        INT,
  ejercicio_idx   INT,
  ejercicio_nombre TEXT,
  nota       TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feedbacks_all" ON feedbacks FOR ALL USING (true) WITH CHECK (true);

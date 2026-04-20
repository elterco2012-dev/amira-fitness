-- Sistema de pagos de membresía
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE alumnas
  ADD COLUMN IF NOT EXISTS fecha_inicio DATE,
  ADD COLUMN IF NOT EXISTS precio       NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS dia_cobro    INT DEFAULT 1;

CREATE TABLE IF NOT EXISTS pagos (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  alumna_id  BIGINT REFERENCES alumnas(id) ON DELETE CASCADE,
  mes        TEXT NOT NULL,                   -- formato '2026-04'
  monto      NUMERIC(10,2),
  fecha_pago TIMESTAMPTZ DEFAULT NOW(),
  nota       TEXT,
  UNIQUE(alumna_id, mes)
);

ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pagos_all" ON pagos FOR ALL USING (true) WITH CHECK (true);

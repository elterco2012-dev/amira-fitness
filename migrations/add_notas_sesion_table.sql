-- Notas de sesión privadas por alumna por semana — solo visibles en el panel
-- Ejecutar en Supabase: SQL Editor → New query → Run

CREATE TABLE IF NOT EXISTS notas_sesion (
  id          BIGSERIAL PRIMARY KEY,
  alumna_id   BIGINT NOT NULL,
  ciclo       INT NOT NULL DEFAULT 1,
  semana      INT NOT NULL DEFAULT 1,
  nota        TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

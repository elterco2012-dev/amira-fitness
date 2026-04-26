-- Peso corporal de alumnas — registrado desde la app de la alumna
-- Permite seguir la evolución del peso a lo largo del tiempo
-- Ejecutar en Supabase: SQL Editor → New query → Run

CREATE TABLE IF NOT EXISTS peso_alumna (
  id          BIGSERIAL PRIMARY KEY,
  alumna_id   BIGINT NOT NULL,
  fecha       DATE NOT NULL DEFAULT CURRENT_DATE,
  peso        NUMERIC(5,1) NOT NULL,
  nota        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(alumna_id, fecha)
);

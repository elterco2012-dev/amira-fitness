-- Notas internas por alumna — solo visibles en el panel de Amira
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS notas_privadas TEXT;

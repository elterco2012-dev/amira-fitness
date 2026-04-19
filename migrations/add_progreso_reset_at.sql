-- Columna para registrar cuándo se reseteó el progreso de una alumna
-- Permite que la app de la alumna detecte el reset y limpie su caché local
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS progreso_reset_at TIMESTAMPTZ;

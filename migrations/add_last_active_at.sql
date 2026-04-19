-- Registrar la última vez que una alumna marcó ejercicios como hechos
-- Usado por el panel para el semáforo de atención (🔴🟡🟢)
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ;

-- Columnas agregadas al formulario de registro (datos personales y salud)
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE registros ADD COLUMN IF NOT EXISTS nacimiento TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS genero TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS lugar_entrenamiento TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS fuma TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS peso TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS altura TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS exp TEXT;

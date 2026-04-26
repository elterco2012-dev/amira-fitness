-- Campos de perfil/registro almacenados directamente en alumnas
-- Permite que Amira cargue manualmente los mismos datos que el formulario de registro
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS genero TEXT;
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS nacimiento TEXT;
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS ubicacion TEXT;
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS lugar_entrenamiento TEXT;
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS fuma TEXT;
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS peso TEXT;
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS altura TEXT;
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS exp TEXT;

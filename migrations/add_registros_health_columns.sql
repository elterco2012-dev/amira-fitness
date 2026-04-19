-- Agregar columnas de salud faltantes en tabla registros (fichas de salud)
-- Sin estas columnas, los datos del formulario se descartan silenciosamente
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE registros ADD COLUMN IF NOT EXISTS control_medico TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS enfermedad TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS medicacion TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS patologia_cardio TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS lesiones_previas TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS dolor_zonas TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS actividad_actual TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS extra TEXT;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS alumna_id INTEGER;

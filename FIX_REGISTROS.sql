-- ============================================================
-- FIX: Agregar columnas faltantes a la tabla registros
-- Ejecutar en Supabase → SQL Editor → New query → Run
-- ============================================================

-- Agregar alumna_id para vincular la ficha a la alumna
ALTER TABLE registros ADD COLUMN IF NOT EXISTS alumna_id bigint REFERENCES alumnas(id) ON DELETE SET NULL;

-- Agregar campos de salud que guarda la ficha
ALTER TABLE registros ADD COLUMN IF NOT EXISTS edad text;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS control_medico text;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS enfermedad text;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS medicacion text;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS patologia_cardio text;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS lesiones_previas text;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS dolor_zonas text;
ALTER TABLE registros ADD COLUMN IF NOT EXISTS actividad_actual text;

-- Verificar
SELECT id, nombre, alumna_id, fecha, estado 
FROM registros 
ORDER BY created_at DESC;

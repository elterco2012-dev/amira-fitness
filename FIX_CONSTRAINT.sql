-- ============================================================
-- FIX: Ejecutar este SQL en Supabase si el UPSERT sigue dando 409
-- SQL Editor → New query → Run
-- ============================================================

-- El problema es que Supabase necesita un unique constraint
-- explícito en las columnas (alumna_id, ciclo, semana, dia)
-- para que el on_conflict funcione correctamente.

-- Primero verificar si existe el constraint
SELECT conname, contype 
FROM pg_constraint 
WHERE conrelid = 'rutinas'::regclass 
AND contype = 'u';

-- Si el resultado no muestra ningún unique constraint, ejecutar esto:

-- 1. Eliminar el constraint existente si tiene nombre incorrecto
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conrelid = 'rutinas'::regclass 
    AND contype = 'u'
    AND conname != 'rutinas_alumna_id_ciclo_semana_dia_key'
  ) THEN
    -- Buscar y eliminar el constraint viejo
    ALTER TABLE rutinas DROP CONSTRAINT IF EXISTS rutinas_alumna_id_semana_dia_key;
  END IF;
END $$;

-- 2. Asegurar que el unique constraint correcto existe
ALTER TABLE rutinas DROP CONSTRAINT IF EXISTS rutinas_alumna_id_ciclo_semana_dia_key;
ALTER TABLE rutinas ADD CONSTRAINT rutinas_alumna_id_ciclo_semana_dia_key 
  UNIQUE (alumna_id, ciclo, semana, dia);

-- 3. Verificar que quedó bien
SELECT conname 
FROM pg_constraint 
WHERE conrelid = 'rutinas'::regclass 
AND contype = 'u';
-- Debe mostrar: rutinas_alumna_id_ciclo_semana_dia_key

-- 4. También asegurar que ciclo tiene default 1 (por si había rutinas viejas)
ALTER TABLE rutinas ALTER COLUMN ciclo SET DEFAULT 1;
UPDATE rutinas SET ciclo = 1 WHERE ciclo IS NULL;

-- 5. Verificar rutinas existentes
SELECT alumna_id, ciclo, semana, dia, jsonb_array_length(ejercicios) as ejercicios
FROM rutinas
ORDER BY alumna_id, ciclo, semana, dia;

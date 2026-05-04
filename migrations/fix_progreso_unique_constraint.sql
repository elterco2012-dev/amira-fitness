-- El constraint progreso_unique original no incluye 'ciclo', causando
-- duplicados cuando una alumna avanza a ciclo 2+ con los mismos ejercicios.
-- Este script lo reemplaza con uno correcto que incluye los 5 campos.

-- 1. Eliminar constraint e índice anteriores
ALTER TABLE progreso DROP CONSTRAINT IF EXISTS progreso_unique;
DROP INDEX IF EXISTS progreso_unique_idx;

-- 2. Eliminar filas duplicadas antes de crear el constraint
--    (mantiene la fila con id más alto por grupo)
DELETE FROM progreso
WHERE id NOT IN (
  SELECT MAX(id)
  FROM progreso
  GROUP BY alumna_id, ciclo, semana, dia, ejercicio_idx
);

-- 3. Crear el constraint correcto (CONSTRAINT, no solo INDEX, para que
--    PostgREST lo use en el ON CONFLICT de los upserts)
ALTER TABLE progreso
  ADD CONSTRAINT progreso_unique
  UNIQUE (alumna_id, ciclo, semana, dia, ejercicio_idx);

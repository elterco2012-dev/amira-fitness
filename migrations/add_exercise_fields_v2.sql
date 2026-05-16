-- Nuevos campos para ejercicios_biblioteca: posición, bilateral, impacto
ALTER TABLE ejercicios_biblioteca
  ADD COLUMN IF NOT EXISTS posicion_ejercicio TEXT,
  ADD COLUMN IF NOT EXISTS bilateral BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS impacto TEXT;

-- Backfill: ejercicios existentes sin clasificar quedan con bilateral=TRUE por defecto
UPDATE ejercicios_biblioteca SET bilateral = TRUE WHERE bilateral IS NULL;

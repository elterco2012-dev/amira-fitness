-- Nivel de experiencia de la alumna para que Claude calibre la dificultad
-- de los ejercicios en las rutinas generadas por IA.
ALTER TABLE alumnas
  ADD COLUMN IF NOT EXISTS nivel text DEFAULT NULL;

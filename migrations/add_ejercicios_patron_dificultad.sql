-- Patrón de movimiento y dificultad para que Claude balancee los patrones
-- en cada sesión y seleccione ejercicios acordes al nivel de la alumna.
ALTER TABLE ejercicios_biblioteca
  ADD COLUMN IF NOT EXISTS patron_movimiento text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS nivel_dificultad  integer DEFAULT NULL;

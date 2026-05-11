-- Equipamiento requerido para cada ejercicio de la biblioteca.
-- Permite que Claude filtre ejercicios según el equipamiento disponible
-- de cada alumna y no mezcle ejercicios de gym en rutinas de casa.

ALTER TABLE ejercicios_biblioteca
  ADD COLUMN IF NOT EXISTS equipamiento_requerido text DEFAULT 'sin_equipamiento';

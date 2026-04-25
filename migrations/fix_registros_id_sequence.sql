-- La columna id de registros no tiene secuencia/default configurada.
-- Este script la configura para que se genere automáticamente.
-- Ejecutar en Supabase: SQL Editor → New query → Run

-- Crear secuencia si no existe
CREATE SEQUENCE IF NOT EXISTS registros_id_seq;

-- Asignar el valor inicial basado en el máximo id existente (evita colisiones)
SELECT setval('registros_id_seq', COALESCE((SELECT MAX(id) FROM registros), 0) + 1, false);

-- Asignar el default a la columna
ALTER TABLE registros ALTER COLUMN id SET DEFAULT nextval('registros_id_seq');

-- Asociar la secuencia a la columna (se borra cuando se borra la tabla)
ALTER SEQUENCE registros_id_seq OWNED BY registros.id;

-- Eliminar ejercicios duplicados de la biblioteca
-- Conserva el registro con el id más bajo (el primero creado) por nombre
-- Ejecutar en Supabase: SQL Editor → New query → Run

DELETE FROM ejercicios_biblioteca
WHERE id NOT IN (
  SELECT DISTINCT ON (nombre) id
  FROM ejercicios_biblioteca
  ORDER BY nombre, id ASC
);

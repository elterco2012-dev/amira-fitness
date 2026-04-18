-- Agrega columna ejercicio_nombre a la tabla progreso.
-- Esto desacopla el historial del índice posicional del ejercicio,
-- evitando que el nombre mostrado quede desactualizado si la rutina cambia.
--
-- Es retrocompatible: registros viejos quedan con ejercicio_nombre = ''
-- y el panel los muestra haciendo fallback al índice como antes.
--
-- Ejecutar en Supabase: SQL Editor → New query → pegar y correr.

ALTER TABLE progreso
  ADD COLUMN IF NOT EXISTS ejercicio_nombre TEXT NOT NULL DEFAULT '';

-- Restricción única necesaria para que el upsert de progreso funcione correctamente
-- Sin esto, cada guardado crea una fila nueva en vez de actualizar la existente
-- Ejecutar en Supabase: SQL Editor → New query → Run

CREATE UNIQUE INDEX IF NOT EXISTS progreso_unique_idx
  ON progreso (alumna_id, ciclo, semana, dia, ejercicio_idx);

-- Permite múltiples dispositivos por alumna en push_subscriptions.
-- Antes: único constraint era alumna_id → solo 1 dispositivo por alumna.
-- Ahora: único constraint es endpoint → N dispositivos por alumna.

-- 1. Eliminar constraint/índice anterior sobre alumna_id (varios nombres posibles)
ALTER TABLE push_subscriptions DROP CONSTRAINT IF EXISTS push_subscriptions_alumna_id_key;
ALTER TABLE push_subscriptions DROP CONSTRAINT IF EXISTS push_subscriptions_pkey;
DROP INDEX IF EXISTS push_subscriptions_alumna_id_key;
DROP INDEX IF EXISTS push_subscriptions_alumna_id_idx;

-- 2. Si no hay primary key, agregar un id serial
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='push_subscriptions' AND column_name='id'
  ) THEN
    ALTER TABLE push_subscriptions ADD COLUMN id bigserial PRIMARY KEY;
  END IF;
END$$;

-- 3. Eliminar filas duplicadas por endpoint (quedarse con el más reciente)
DELETE FROM push_subscriptions
WHERE ctid NOT IN (
  SELECT DISTINCT ON (endpoint) ctid
  FROM push_subscriptions
  ORDER BY endpoint, id DESC
);

-- 4. Agregar unique constraint sobre endpoint para que PostgREST use ON CONFLICT
ALTER TABLE push_subscriptions
  ADD CONSTRAINT push_subscriptions_endpoint_key UNIQUE (endpoint);

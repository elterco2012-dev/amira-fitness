-- Migra los valores de equipamiento de las alumnas al mismo vocabulario
-- que usa ejercicios_biblioteca. La columna equipamiento es jsonb.
--
-- Cambios:
--   bandas              → banda_elastica
--   mancuernas_livianas → mancuernas
--   mancuernas_medias   → mancuernas
--   mancuernas_pesadas  → mancuernas
--   pelota              → fitball
--   polea_trx           → polea + trx (dos entradas separadas)
--   sin_equipo          → eliminado (sin_equipamiento siempre disponible)
--   colchoneta          → eliminado

-- Paso 1: agregar 'trx' a quienes tenían 'polea_trx'
UPDATE alumnas
SET equipamiento = (
  SELECT jsonb_agg(DISTINCT v ORDER BY v)
  FROM (
    SELECT jsonb_array_elements_text(equipamiento) AS v
    UNION ALL
    SELECT 'trx'
  ) s
  WHERE v IS NOT NULL
)
WHERE equipamiento IS NOT NULL
  AND equipamiento @> '["polea_trx"]';

-- Paso 2: renombrar todos los valores viejos y deduplicar
UPDATE alumnas
SET equipamiento = (
  SELECT jsonb_agg(DISTINCT nuevo ORDER BY nuevo)
  FROM jsonb_array_elements_text(equipamiento) AS viejo
  CROSS JOIN LATERAL (VALUES (
    CASE viejo
      WHEN 'bandas'              THEN 'banda_elastica'
      WHEN 'mancuernas_livianas' THEN 'mancuernas'
      WHEN 'mancuernas_medias'   THEN 'mancuernas'
      WHEN 'mancuernas_pesadas'  THEN 'mancuernas'
      WHEN 'pelota'              THEN 'fitball'
      WHEN 'polea_trx'           THEN 'polea'
      WHEN 'sin_equipo'          THEN NULL
      WHEN 'colchoneta'          THEN NULL
      ELSE viejo
    END
  )) AS t(nuevo)
  WHERE nuevo IS NOT NULL
)
WHERE equipamiento IS NOT NULL;

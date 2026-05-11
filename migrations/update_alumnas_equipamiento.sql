-- Migra los valores de equipamiento de las alumnas al mismo vocabulario
-- que usa ejercicios_biblioteca, para que Claude pueda filtrar correctamente.
--
-- Cambios:
--   bandas              → banda_elastica
--   mancuernas_livianas → mancuernas
--   mancuernas_medias   → mancuernas
--   mancuernas_pesadas  → mancuernas
--   pelota              → fitball
--   polea_trx           → polea + trx (dos entradas separadas)
--   sin_equipo          → eliminado (sin_equipamiento siempre está disponible)
--   colchoneta          → eliminado (no corresponde a equipamiento de ejercicio)

-- Paso 1: agregar 'trx' a quienes tenían 'polea_trx' (antes de renombrarlo)
UPDATE alumnas
SET equipamiento = array_append(equipamiento, 'trx')
WHERE equipamiento IS NOT NULL
  AND 'polea_trx' = ANY(equipamiento)
  AND NOT ('trx' = ANY(equipamiento));

-- Paso 2: renombrar todos los valores viejos y deduplicar
UPDATE alumnas
SET equipamiento = (
  SELECT array_agg(DISTINCT nuevo_val ORDER BY nuevo_val)
  FROM unnest(equipamiento) AS viejo_val,
  LATERAL (
    SELECT CASE viejo_val
      WHEN 'bandas'              THEN 'banda_elastica'
      WHEN 'mancuernas_livianas' THEN 'mancuernas'
      WHEN 'mancuernas_medias'   THEN 'mancuernas'
      WHEN 'mancuernas_pesadas'  THEN 'mancuernas'
      WHEN 'pelota'              THEN 'fitball'
      WHEN 'polea_trx'           THEN 'polea'
      WHEN 'sin_equipo'          THEN NULL
      WHEN 'colchoneta'          THEN NULL
      ELSE viejo_val
    END AS nuevo_val
  ) mapped
  WHERE nuevo_val IS NOT NULL
)
WHERE equipamiento IS NOT NULL AND cardinality(equipamiento) > 0;

-- Fix: Aaron Armoa shows "Ficha completada" with "Lesiones: dolor de rodilla"
-- even though he never filled the health form.
--
-- Cause: When an alumna is deleted, her registros keep the old alumna_id.
-- If re-registration or a previous approve accidentally re-linked those
-- registros to the new alumna's ID, ghost health data appears in the panel.
--
-- Run this in Supabase SQL Editor to diagnose and clean up.

-- STEP 1 — See current Aaron and ALL his registros
SELECT 'alumna' AS source, id, nombre, slug, lesiones AS lesiones_alumna
  FROM alumnas
 WHERE nombre ILIKE '%aaron%' OR slug ILIKE '%aaron%'
UNION ALL
SELECT 'registro' AS source, r.id, r.nombre, r.alumna_id::text, r.lesiones
  FROM registros r
 WHERE r.nombre ILIKE '%aaron%'
 ORDER BY source, id;

-- STEP 2 — Remove health-ficha registros linked to current Aaron
-- (only removes records with health data, keeps the plain registration record)
-- Note: does NOT use the "tipo" column since it may not exist yet in production
WITH aaron AS (SELECT id FROM alumnas WHERE slug = 'aaron-armoa')
DELETE FROM registros
 WHERE alumna_id = (SELECT id FROM aaron)
   AND (lesiones IS NOT NULL
        OR control_medico IS NOT NULL
        OR enfermedad IS NOT NULL
        OR medicacion IS NOT NULL);

-- STEP 3 — Also unlink any orphaned Aaron registros
-- (alumna_id points to a deleted alumna — safe to NULL them out)
UPDATE registros
   SET alumna_id = NULL
 WHERE nombre ILIKE '%aaron%'
   AND alumna_id IS NOT NULL
   AND alumna_id NOT IN (SELECT id FROM alumnas WHERE nombre ILIKE '%aaron%');

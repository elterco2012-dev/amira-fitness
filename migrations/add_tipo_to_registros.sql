-- Add "tipo" column to distinguish registration forms from health fichas.
-- Registration registros: tipo = 'registro'
-- Health ficha registros: tipo = 'ficha_salud'
--
-- Run this in Supabase SQL Editor BEFORE deploying the updated panel.

ALTER TABLE registros ADD COLUMN IF NOT EXISTS tipo TEXT DEFAULT 'registro';

-- Mark all existing rows as 'registro' (they all came from the registration form)
UPDATE registros SET tipo = 'registro' WHERE tipo IS NULL;

-- Re-identify existing health fichas: control_medico is only captured by /ficha/,
-- never by /registro/ — so any linked registro with control_medico IS a health ficha.
UPDATE registros
   SET tipo = 'ficha_salud'
 WHERE alumna_id IS NOT NULL
   AND (tipo = 'registro' OR tipo IS NULL)
   AND control_medico IS NOT NULL;

-- Fix Aaron: unlink the registration registro (with lesiones from registration form)
-- so it doesn't ghost-appear as a health ficha
WITH aaron AS (SELECT id FROM alumnas WHERE slug = 'aaron-armoa')
UPDATE registros
   SET alumna_id = NULL
 WHERE alumna_id = (SELECT id FROM aaron)
   AND tipo = 'registro';

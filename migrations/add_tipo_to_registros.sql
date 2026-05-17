-- Add "tipo" column to distinguish registration forms from health fichas.
-- Registration registros: tipo = 'registro'
-- Health ficha registros: tipo = 'ficha_salud'
--
-- Run this in Supabase SQL Editor BEFORE deploying the updated panel.

ALTER TABLE registros ADD COLUMN IF NOT EXISTS tipo TEXT DEFAULT 'registro';

-- Mark all existing rows as 'registro' (they all came from the registration form)
UPDATE registros SET tipo = 'registro' WHERE tipo IS NULL;

-- Fix Aaron: delete any registration registro that was mistakenly being read as a health ficha
-- (safe to run even after the column exists — just cleans up Aaron's ghost data)
WITH aaron AS (SELECT id FROM alumnas WHERE slug = 'aaron-armoa')
UPDATE registros
   SET alumna_id = NULL
 WHERE alumna_id = (SELECT id FROM aaron)
   AND (tipo = 'registro' OR tipo IS NULL);

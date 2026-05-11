-- División de sesiones preferida de la alumna.
-- Le indica a Claude cómo distribuir los grupos musculares por día.
ALTER TABLE alumnas
  ADD COLUMN IF NOT EXISTS split text DEFAULT NULL;

-- Campos de perfil para planificación asistida por IA.
-- Permiten que el edge function generate-routine tenga contexto
-- estructurado sobre cada alumna sin depender de texto libre.

ALTER TABLE alumnas
  ADD COLUMN IF NOT EXISTS objetivo        text,          -- 'tonificar' | 'bajar_peso' | 'ganar_fuerza' | 'salud' | 'rehabilitacion' | 'rendimiento'
  ADD COLUMN IF NOT EXISTS equipamiento    jsonb,         -- array de strings: ['mancuernas_medias','bandas','colchoneta', ...]
  ADD COLUMN IF NOT EXISTS tiempo_sesion   smallint;      -- minutos disponibles por sesión: 30 | 45 | 60 | 75 | 90

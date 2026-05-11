-- Días específicos de entrenamiento (jsonb array of day names)
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS dias_disponibles jsonb DEFAULT NULL;

-- Foco muscular prioritario
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS foco_muscular text DEFAULT NULL;

-- Adaptar planificación al ciclo menstrual
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS adaptar_ciclo_menstrual boolean DEFAULT false;

-- Estilo de sesión preferido
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS estilo_sesion text DEFAULT NULL;

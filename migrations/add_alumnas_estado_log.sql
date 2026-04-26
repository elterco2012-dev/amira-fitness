-- Historial de cambios de estado por alumna (activa / pausada / baja)
-- Se acumula como array JSONB: [{estado, fecha}]
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS estado_log JSONB DEFAULT '[]';

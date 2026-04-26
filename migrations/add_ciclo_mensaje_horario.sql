-- Mensaje de Amira por ciclo + horario de entrenamiento preferido por alumna
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS ciclos_mensajes JSONB DEFAULT '{}';
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS horario_entreno JSONB;

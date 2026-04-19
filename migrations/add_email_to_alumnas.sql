-- Fase 2: autenticación de alumnas con email + PIN
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS email TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS alumnas_email_unique ON alumnas(email) WHERE email IS NOT NULL;

-- Agregar campo para nombres personalizados de ciclos (ej: "Marzo 2026")
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS ciclos_nombres JSONB DEFAULT '{}';

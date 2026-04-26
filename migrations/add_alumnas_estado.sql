-- Estado de alumna: activa / pausada / baja
-- Pausadas: no aparecen en alertas, semáforo ni cobros pendientes
-- Bajas: archivadas, visibles solo en la lista de alumnas
-- Ejecutar en Supabase: SQL Editor → New query → Run

ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS estado TEXT DEFAULT 'activa';

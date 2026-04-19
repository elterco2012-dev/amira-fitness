-- Permitir DELETE en tabla rutinas (necesario para eliminar ciclos desde el panel)
-- Ejecutar en Supabase: SQL Editor → New query → Run

DROP POLICY IF EXISTS "Allow delete rutinas" ON rutinas;
CREATE POLICY "Allow delete rutinas" ON rutinas FOR DELETE USING (true);

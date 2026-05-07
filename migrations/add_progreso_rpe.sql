-- Agrega columna rpe (Rate of Perceived Exertion, escala 6-10) a progreso.
-- Permite que las alumnas indiquen qué tan difícil sintieron cada ejercicio,
-- habilitando sugerencias automáticas de progresión en el panel.

ALTER TABLE progreso ADD COLUMN IF NOT EXISTS rpe smallint CHECK (rpe >= 6 AND rpe <= 10);

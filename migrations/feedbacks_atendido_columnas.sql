-- Una alerta de dolor se puede marcar como atendida, con una nota opcional.
-- El panel muestra como pendientes solo las de dolor sin atender desde el
-- 1/10/2026; las anteriores ya no se veian y quedan en el historial sin tocarse.
-- Aplicada el 12/10/2026.
alter table feedbacks add column if not exists atendido_at timestamptz;
alter table feedbacks add column if not exists atendido_nota text;

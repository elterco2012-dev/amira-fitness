-- Recordatorio diario de entrenamiento via pg_cron + pg_net
-- REQUISITOS:
--   1. Activar extensiones en Supabase Dashboard → Database → Extensions:
--      - pg_cron
--      - pg_net
--   2. Reemplazar <SERVICE_ROLE_KEY> con tu clave real de Supabase
--      (Dashboard → Settings → API → service_role key)
--   3. Ejecutar este SQL en Supabase: SQL Editor → New query → Run
--
-- El cron envía recordatorios todos los días a las 9:00 AM UTC.
-- Para cambiar la hora, edita '0 9 * * *' (formato: minuto hora * * *)

SELECT cron.schedule(
  'push-recordatorios-diarios',
  '0 9 * * *',
  $$
  SELECT net.http_post(
    url     := 'https://aywkeoxwybzcexaichtv.supabase.co/functions/v1/send-push',
    headers := jsonb_build_object(
      'Content-Type',   'application/json',
      'Authorization',  'Bearer <SERVICE_ROLE_KEY>'
    ),
    body    := '{}'::jsonb
  );
  $$
);

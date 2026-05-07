-- Recordatorio diario de entrenamiento via pg_cron + pg_net
-- REQUISITOS:
--   1. Activar extensiones en Supabase Dashboard → Database → Extensions:
--      - pg_cron
--      - pg_net
--   2. Reemplazar <SERVICE_ROLE_KEY> con tu clave real de Supabase
--      (Dashboard → Settings → API → service_role key)
--   3. Ejecutar este SQL en Supabase: SQL Editor → New query → Run
--
-- Hora: 12:00 UTC = 9:00 AM Argentina (UTC-3)
-- Para cambiar la hora, edita '0 12 * * *' (formato: minuto hora * * *)

-- Si ya existe un cron anterior con el mismo nombre, eliminarlo primero
SELECT cron.unschedule('push-recordatorios-diarios');

SELECT cron.schedule(
  'push-recordatorios-diarios',
  '0 12 * * *',
  $$
  SELECT net.http_post(
    url     := 'https://aywkeoxwybzcexaichtv.supabase.co/functions/v1/send-push',
    headers := jsonb_build_object(
      'Content-Type',   'application/json',
      'apikey',         '<SERVICE_ROLE_KEY>',
      'Authorization',  'Bearer <SERVICE_ROLE_KEY>'
    ),
    body    := '{"filter_by_day":true}'::jsonb
  );
  $$
);

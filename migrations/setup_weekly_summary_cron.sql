-- Resumen semanal automático para Amira via pg_cron + pg_net
-- Envía un push los domingos a la noche con el panorama de la semana.
--
-- REQUISITOS:
--   1. Activar extensiones en Supabase Dashboard → Database → Extensions:
--      - pg_cron
--      - pg_net
--   2. Reemplazar <SERVICE_ROLE_KEY> con tu clave real de Supabase
--      (Dashboard → Settings → API → service_role key)
--   3. Desplegar el edge function `weekly-summary`
--   4. Ejecutar este SQL en Supabase: SQL Editor → New query → Run
--
-- Hora: 01:00 UTC del lunes = 22:00 ART del domingo (UTC-3)
-- Para cambiar la hora, edita '0 1 * * 1' (formato: minuto hora * * dow)

-- Si ya existe un cron anterior con el mismo nombre, eliminarlo primero
SELECT cron.unschedule('amira-resumen-semanal');

SELECT cron.schedule(
  'amira-resumen-semanal',
  '0 1 * * 1',
  $$
  SELECT net.http_post(
    url     := 'https://aywkeoxwybzcexaichtv.supabase.co/functions/v1/weekly-summary',
    headers := jsonb_build_object(
      'Content-Type',   'application/json',
      'apikey',         '<SERVICE_ROLE_KEY>',
      'Authorization',  'Bearer <SERVICE_ROLE_KEY>'
    ),
    body    := '{}'::jsonb
  );
  $$
);

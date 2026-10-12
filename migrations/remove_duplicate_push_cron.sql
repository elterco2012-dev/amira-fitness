-- 'send-training-reminders' llamaba a send-push con el mismo cuerpo y a la misma
-- hora (12:00 UTC) que 'push-recordatorios-diarios' (ver setup_push_cron.sql),
-- asi que cada alumna recibia el recordatorio diario dos veces. No estaba
-- documentada en el repo. Aplicada el 12/10/2026.
DO $$ BEGIN
  PERFORM cron.unschedule('send-training-reminders');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

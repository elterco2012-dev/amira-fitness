-- Borra todas las suscripciones push (alumnas + panel Amira)
-- para forzar que todos los dispositivos se re-registren con los endpoints frescos.
-- Después de correr esto, la próxima vez que cada usuario abra la app
-- le aparece el aviso para activar notificaciones.

TRUNCATE TABLE push_subscriptions;
TRUNCATE TABLE amira_push_subscriptions;

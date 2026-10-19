-- Cómo llegó cada alumna (19/10/2026): Instagram, WhatsApp, Recomendación, Google, Web u Otro.
-- Lo anota Amira al darla de alta o en su ficha ("¿Cómo llegó?"), y Análisis cuenta de
-- dónde vienen las alumnas. Hasta acá solo se sabía de dónde venían las visitas a la web,
-- y de agosto a octubre ninguna alumna entró por la web: llegaron por Instagram y una
-- por WhatsApp.
-- No es privado: la alumna lo puede leer en su fila, pero no cambiarlo
-- (alumnas_limitar_cambios).
-- Marcha atrás: alter table public.alumnas drop column origen; (borra lo anotado).

alter table public.alumnas add column if not exists origen text;

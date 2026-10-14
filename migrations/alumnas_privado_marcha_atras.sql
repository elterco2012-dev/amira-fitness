-- Marcha atrás de alumnas_privado.sql. Solo para una emergencia: las notas privadas y
-- el historial de pausas y bajas vuelven a alumnas, y quedan otra vez a la vista de
-- cada alumna. La tabla alumnas_privado queda como está.
-- Correrla en el SQL Editor de Supabase. Junto con esto hay que volver el panel a la
-- versión anterior: el nuevo lee y escribe en alumnas_privado.

drop trigger if exists alumnas_sin_privado on public.alumnas;

update public.alumnas a
   set notas_privadas = p.notas_privadas,
       estado_log     = p.estado_log
  from public.alumnas_privado p
 where p.alumna_id = a.id;

-- Numeros de la app para la pagina web: solo totales, sin datos de nadie.
-- Aplicada el 28/10/2026.
--
-- La web muestra cuantos ejercicios se marcaron, cuantos entrenamientos hubo y cuantas
-- alumnas entrenaron con la app, y se actualizan solos. Cualquiera puede llamarla (la
-- pagina no tiene sesion), por eso devuelve tres numeros y nada mas.
-- - No cuenta la cuenta con la que entrena Amira (id 3).
-- - Una alumna que entreno sigue contando aunque despues se haya dado de baja.
-- - Entrenamiento: un dia de rutina (alumna, ciclo, semana, dia) con al menos un ejercicio hecho.
-- Marcha atras: numeros_publicos_marcha_atras.sql

create or replace function public.numeros_publicos()
returns json
language sql stable security definer set search_path = public
as $$
  select json_build_object(
    'ejercicios', (select count(*) from public.progreso where hecho and alumna_id <> 3),
    'entrenamientos', (select count(*) from (
        select distinct alumna_id, ciclo, semana, dia from public.progreso where hecho and alumna_id <> 3) d),
    'alumnas', (select count(distinct alumna_id) from public.progreso where hecho and alumna_id <> 3)
  );
$$;

revoke all on function public.numeros_publicos() from public;
grant execute on function public.numeros_publicos() to anon, authenticated;

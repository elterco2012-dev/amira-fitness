-- Ultimo ingreso de cada alumna a la app, para el arranque guiado del panel.
-- Aplicada el 13/10/2026.
--
-- El panel no puede leer auth.users. Para saber si una alumna nueva pudo entrar
-- con su PIN (el paso que mas falla al arrancar), esta funcion devuelve solo el
-- id de la alumna y la fecha de su ultimo ingreso, y solo a Amira: cualquier
-- otra cuenta recibe cero filas y sin sesion no se puede llamar.
-- Marcha atras: drop function public.ingresos_alumnas();

create or replace function public.ingresos_alumnas()
returns table(alumna_id bigint, ultimo_ingreso timestamptz)
language sql stable security definer set search_path = public
as $$
  select a.id, u.last_sign_in_at
    from public.alumnas a
    join auth.users u on lower(u.email) = lower(a.email)
   where auth.email() = 'amiralezcano@gmail.com';
$$;

revoke all on function public.ingresos_alumnas() from public;
revoke all on function public.ingresos_alumnas() from anon;
grant execute on function public.ingresos_alumnas() to authenticated;

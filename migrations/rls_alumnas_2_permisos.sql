-- Cierre de permisos de alumnas y comentarios, parte 2 de 2.
-- Hasta aca, cualquiera con la clave publica del sitio (que esta en el codigo de
-- la pagina) podia leer, modificar y borrar las fichas de todas las alumnas:
-- telefonos, emails, lesiones, peso y fecha de nacimiento, que es el PIN de
-- ingreso a la app. Las politicas permisivas se suman, asi que bastaba una con
-- USING (true) para dejar la tabla abierta. Aplicada el 12/10/2026.
--
-- Despues de esto:
--   alumnas      Amira: todo. Cada alumna: ver y actualizar solo su fila.
--                Sin ingresar: nada (las paginas previas al ingreso usan las
--                funciones de la parte 1).
--   comentarios  Amira: todo. Cada alumna: solo los suyos.
-- Las Edge Functions usan la clave de servicio y no se ven afectadas.

-- alumnas -------------------------------------------------------------------
drop policy if exists "public all alumnas"    on alumnas;
drop policy if exists "public write alumnas"  on alumnas;
drop policy if exists "Public delete alumnas" on alumnas;
drop policy if exists "Public insert alumnas" on alumnas;
drop policy if exists "Public select alumnas" on alumnas;
drop policy if exists "public read alumnas"   on alumnas;
drop policy if exists "Public update alumnas" on alumnas;
drop policy if exists alumnas_anon_read       on alumnas;
drop policy if exists alumnas_self_read       on alumnas;
drop policy if exists alumnas_self_write      on alumnas;
-- alumnas_admin (Amira, todo) se mantiene.

-- Sin distinguir mayusculas: el email de ingreso siempre llega en minuscula.
create policy alumnas_self_read on alumnas for select to authenticated
  using (lower(email) = lower(auth.email()));
create policy alumnas_self_write on alumnas for update to authenticated
  using (lower(email) = lower(auth.email()))
  with check (lower(email) = lower(auth.email()));

-- comentarios ---------------------------------------------------------------
drop policy if exists comentarios_own              on comentarios;
drop policy if exists "public all comentarios"     on comentarios;
drop policy if exists "public write comentarios"   on comentarios;
drop policy if exists "Public insert comentarios"  on comentarios;
drop policy if exists "Public select comentarios"  on comentarios;
drop policy if exists "public read comentarios"    on comentarios;
drop policy if exists "Public update comentarios"  on comentarios;
-- comentarios_admin (Amira, todo) se mantiene.

create policy comentarios_alumna on comentarios for all to authenticated
  using (alumna_id in (select id from alumnas where lower(email) = lower(auth.email())))
  with check (alumna_id in (select id from alumnas where lower(email) = lower(auth.email())));

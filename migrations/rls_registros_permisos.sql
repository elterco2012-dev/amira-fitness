-- Cierre de permisos de registros. Aplicada el 12/10/2026.
-- registros guarda el cuestionario de salud completo de cada persona que se
-- inscribe (enfermedades, medicacion, lesiones). Hasta aca cualquiera con la
-- clave publica del sitio podia leerlo, modificarlo y borrarlo.
--
-- Despues de esto:
--   Amira: todo (registros_admin, sin cambios).
--   Sin sesion: solo inscribirse, es decir, crear una fila de tipo registro o
--   ficha_salud. No puede leer, modificar ni borrar ninguna.
-- El formulario y la ficha insertan con return=minimal (sbInsertSinRespuesta),
-- porque devolver la fila exigiria permiso de lectura.

drop policy if exists "public all registros"    on registros;
drop policy if exists "Public delete registros" on registros;
drop policy if exists "Public insert registros" on registros;
drop policy if exists allow_anon_insert         on registros;
drop policy if exists registros_anon_insert     on registros;
drop policy if exists "Public select registros" on registros;
drop policy if exists "Public update registros" on registros;
-- registros_admin (Amira, todo) se mantiene.

create policy registros_inscripcion on registros for insert to anon, authenticated
  with check (tipo in ('registro','ficha_salud') and estado in ('pendiente','aprobado'));

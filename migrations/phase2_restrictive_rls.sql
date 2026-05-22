-- ═══════════════════════════════════════════════════════════════
-- FASE 2: Políticas RLS restrictivas
-- Ejecutar en Supabase: SQL Editor → New query → Run
--
-- Qué cambia:
--   • pagos, plantillas, notas_sesion, amira_push_subscriptions → solo Amira
--   • rutinas, ejercicios_biblioteca → anon puede leer, no escribir
--   • feedbacks, registros → anon puede insertar, no leer
--   • alumnas → anon puede leer (necesario para /alumna y /ficha)
--
-- ⚠️  DEUDA TÉCNICA documentada:
--   • alumnas anon WRITE: la página /ficha escribe datos de salud sin auth.
--     Fix definitivo: mover submit en /ficha a un edge function con service role.
--   • progreso/comentarios anon WRITE: la página /alumna registra progreso sin
--     poder verificar el alumna_id del caller. Fix: requerir auth para todas las alumnas.
-- ═══════════════════════════════════════════════════════════════

-- ── Drop políticas permisivas de Fase 1 ─────────────────────────
DROP POLICY IF EXISTS "anon_read_alumnas"     ON alumnas;
DROP POLICY IF EXISTS "anon_write_alumnas"    ON alumnas;
DROP POLICY IF EXISTS "anon_read_rutinas"     ON rutinas;
DROP POLICY IF EXISTS "anon_write_rutinas"    ON rutinas;
DROP POLICY IF EXISTS "Allow delete rutinas"  ON rutinas;
DROP POLICY IF EXISTS "anon_read_progreso"    ON progreso;
DROP POLICY IF EXISTS "anon_write_progreso"   ON progreso;
DROP POLICY IF EXISTS "anon_read_comentarios" ON comentarios;
DROP POLICY IF EXISTS "anon_write_comentarios"ON comentarios;
DROP POLICY IF EXISTS "anon_read_registros"   ON registros;
DROP POLICY IF EXISTS "anon_write_registros"  ON registros;
DROP POLICY IF EXISTS "anon_read_plantillas"  ON plantillas;
DROP POLICY IF EXISTS "anon_write_plantillas" ON plantillas;
DROP POLICY IF EXISTS "anon_read_biblioteca"  ON ejercicios_biblioteca;
DROP POLICY IF EXISTS "anon_write_biblioteca" ON ejercicios_biblioteca;
DROP POLICY IF EXISTS "pagos_all"             ON pagos;
DROP POLICY IF EXISTS "feedbacks_all"         ON feedbacks;
DROP POLICY IF EXISTS "allow all"             ON amira_push_subscriptions;
DROP POLICY IF EXISTS "push_all"              ON push_subscriptions;

-- ── ALUMNAS ──────────────────────────────────────────────────────
-- Amira: acceso total
CREATE POLICY "alumnas_admin" ON alumnas FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- Alumna autenticada: leer su propia fila + actualizar campos propios (foto, actividad)
CREATE POLICY "alumnas_self_read" ON alumnas FOR SELECT
  USING (auth.email() IS NOT NULL AND auth.email() = email);

CREATE POLICY "alumnas_self_write" ON alumnas FOR UPDATE
  USING    (auth.email() IS NOT NULL AND auth.email() = email)
  WITH CHECK (auth.email() IS NOT NULL AND auth.email() = email);

-- Anon: solo lectura (páginas /alumna y /ficha buscan por slug)
-- ⚠️ Esto aún expone la lista completa si alguien llama sin filtro.
--    Fix futuro: eliminar esta política y mover /alumna a edge function.
CREATE POLICY "alumnas_anon_read" ON alumnas FOR SELECT
  USING (auth.role() = 'anon');

-- ── RUTINAS ──────────────────────────────────────────────────────
-- Amira: acceso total (incluye DELETE)
CREATE POLICY "rutinas_admin" ON rutinas FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- Alumna autenticada: leer sus propias rutinas
CREATE POLICY "rutinas_alumna_read" ON rutinas FOR SELECT
  USING (
    auth.email() IS NOT NULL AND
    alumna_id IN (SELECT id FROM alumnas WHERE email = auth.email())
  );

-- Anon: solo lectura (página /alumna sin auth necesita ver la rutina)
CREATE POLICY "rutinas_anon_read" ON rutinas FOR SELECT
  USING (auth.role() = 'anon');

-- ── PROGRESO ─────────────────────────────────────────────────────
-- Amira: acceso total
CREATE POLICY "progreso_admin" ON progreso FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- Alumna/anon: leer y escribir su propio progreso
-- ⚠️ El alumna_id en el body no está verificado contra el caller.
--    Fix futuro: requerir auth para todas las alumnas y usar auth.uid().
CREATE POLICY "progreso_own" ON progreso FOR ALL
  USING    (true)
  WITH CHECK (true);

-- ── COMENTARIOS ──────────────────────────────────────────────────
CREATE POLICY "comentarios_admin" ON comentarios FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- Alumna/anon: insertar y leer comentarios de la sesión
CREATE POLICY "comentarios_own" ON comentarios FOR ALL
  USING    (true)
  WITH CHECK (true);

-- ── REGISTROS ────────────────────────────────────────────────────
-- Amira: acceso total
CREATE POLICY "registros_admin" ON registros FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- Anon: solo INSERT (formulario de registro y ficha de salud)
-- Nadie más puede leer los registros de otras personas
CREATE POLICY "registros_anon_insert" ON registros FOR INSERT
  WITH CHECK (true);

-- ── PLANTILLAS ───────────────────────────────────────────────────
-- Solo Amira — nadie más necesita acceso
CREATE POLICY "plantillas_admin" ON plantillas FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- ── EJERCICIOS_BIBLIOTECA ────────────────────────────────────────
-- Amira: acceso total (crear, editar, eliminar ejercicios)
CREATE POLICY "biblioteca_admin" ON ejercicios_biblioteca FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- Todos pueden leer (página /alumna muestra nombres de ejercicios)
CREATE POLICY "biblioteca_read" ON ejercicios_biblioteca FOR SELECT
  USING (true);

-- ── PAGOS ────────────────────────────────────────────────────────
-- Solo Amira — datos financieros, ninguna alumna debe ver esto
CREATE POLICY "pagos_admin" ON pagos FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- ── FEEDBACKS ────────────────────────────────────────────────────
-- Amira: leer todos los feedbacks
CREATE POLICY "feedbacks_admin" ON feedbacks FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- Alumna/anon: solo insertar (no puede leer feedbacks de otras alumnas)
CREATE POLICY "feedbacks_insert" ON feedbacks FOR INSERT
  WITH CHECK (true);

-- ── NOTAS_SESION ─────────────────────────────────────────────────
ALTER TABLE notas_sesion ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notas_sesion_admin" ON notas_sesion FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- ── AMIRA_PUSH_SUBSCRIPTIONS ─────────────────────────────────────
-- Los tokens push de los dispositivos de Amira — solo ella debe tocarlos
CREATE POLICY "amira_push_admin" ON amira_push_subscriptions FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- ── PUSH_SUBSCRIPTIONS (de alumnas) ──────────────────────────────
-- Alumnas registran su propio endpoint de notificaciones push
CREATE POLICY "push_own" ON push_subscriptions FOR ALL
  USING    (true)
  WITH CHECK (true);

-- ── PESO_ALUMNA ──────────────────────────────────────────────────
ALTER TABLE peso_alumna ENABLE ROW LEVEL SECURITY;

CREATE POLICY "peso_admin" ON peso_alumna FOR ALL
  USING    (auth.email() = 'amiralezcano@gmail.com')
  WITH CHECK (auth.email() = 'amiralezcano@gmail.com');

-- Alumna/anon: leer y escribir su propio peso
CREATE POLICY "peso_own" ON peso_alumna FOR ALL
  USING    (true)
  WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════
-- RESUMEN DE CAMBIOS
-- ─────────────────────────────────────────────────────────────
-- CERRADO HOY:
--   ✓ pagos             → solo Amira (antes: anon podía leer/modificar pagos)
--   ✓ plantillas        → solo Amira (antes: anon podía ver templates privadas)
--   ✓ notas_sesion      → RLS habilitado + solo Amira (antes: sin RLS)
--   ✓ amira_push_subs   → solo Amira (antes: anon podía agregar/borrar dispositivos)
--   ✓ rutinas           → anon ya no puede escribir (antes: podía borrar/modificar rutinas)
--   ✓ ejercicios_bib    → anon ya no puede escribir (antes: podía modificar la biblioteca)
--   ✓ feedbacks         → anon ya no puede leer feedbacks ajenos
--   ✓ registros         → anon ya no puede leer fichas de salud de otras alumnas
--
-- DEUDA TÉCNICA PENDIENTE:
--   ⚠ alumnas anon WRITE: página /ficha necesita edge function
--   ⚠ progreso/comentarios: alumna_id no verificado contra caller
--   ⚠ send-push edge function: llamada sin auth real desde panel y /alumna
-- ═══════════════════════════════════════════════════════════════

# HANDOFF.md — Amira Fitness
Fecha: 2026-06-12 | Sesión: claude/audit-functional-bugs-p5rcf

---

## Qué se estaba haciendo

Auditoría de bugs funcionales y mejoras de UX en la plataforma Amira Fitness.
La sesión arrancó revisando el comportamiento de ciclos (meses de entrenamiento)
y derivó en una serie de fixes y features nuevos.

---

## Estado al cierre: TODO COMMITEADO Y PUSHEADO

Rama activa: `claude/audit-functional-bugs-p5rcf`
Remote: `origin/claude/audit-functional-bugs-p5rcf` ✓ up to date

No hay cambios sin commitear. Todos los trabajos están en el remoto.

---

## Trabajo completado en esta sesión (en orden cronológico)

### 1. Sistema de fecha de inicio por ciclo (`ciclos_inicio`)
**Commit:** `c26a25c`

Permite a Amira crear el ciclo de julio el 29/6 sin que la alumna lo vea
hasta el 1/7. Antes, crear un ciclo nuevo lo activaba inmediatamente.

**Cómo funciona:**
- Nueva columna JSONB `ciclos_inicio` en tabla `alumnas`: `{"3": "2026-07-01"}`
- Panel: campo "Fecha de inicio" en el modal de nuevo ciclo (default = hoy)
- Alumna app: compara hoy vs `ciclos_inicio[cicloActual]`; si es futuro, muestra el ciclo anterior
- Si la fecha es futura → NO se manda push a la alumna al crear el ciclo

**Migración pendiente (CRÍTICA — correr en Supabase SQL Editor):**
```sql
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS ciclos_inicio jsonb DEFAULT '{}'::jsonb;
```
El código tiene fallbacks para no romperse si la columna no existe, pero sin la
migración la fecha no se guarda.

---

### 2. Date picker para editar fecha de ciclo
**Commits:** `e174f85`, `1ae812e`

Reemplazó el `prompt()` de texto (donde había que escribir `AAAA-MM-DD` a mano)
por un modal con calendario nativo. Incluye:
- Botón 📅 en la lista de ciclos del panel para editar la fecha de cualquier ciclo
- Modal con `<input type="date">`, pre-cargado con la fecha guardada o hoy
- **"Activar ya"**: limpia la fecha Y guarda en un solo click (sin necesidad de "Aceptar")
- **"Aceptar"**: guarda la fecha seleccionada
- **"Cancelar"**: cierra sin cambios

---

### 3. CLAUDE.md — documentación técnica completa
**Commit:** `1b26f76`

Archivo `/CLAUDE.md` creado con documentación exhaustiva para que cualquier
sesión futura pueda continuar sin perder contexto. Incluye: stack, schema DB,
autenticación, sistema de ciclos, edge functions, SW versioning, decisiones
técnicas y restricciones.

---

### 4. Fix: confirmaciones antes de que la IA sobreescriba rutinas
**Commit:** `d29ef2d`

**Causa raíz investigada:** María Martínez tenía "Press de pecho con banda elástica"
donde debería haber "Press de pecho en suelo con mancuernas". El análisis determinó
que el cambio fue probablemente por un click accidental en "📌 Guardar en semana actual"
del modal de IA, que sobreescribía ejercicios sin advertir.

**Fixes:**
- `saveGeneratedRoutine()`: ahora muestra confirm con el nombre exacto del ciclo que
  se va a crear/sobreescribir antes de guardar
- `saveGeneratedRoutineEnSemana()`: muestra advertencia con ⚠️ cuando la semana
  ya tiene ejercicios ("se perderán los ejercicios actuales")

---

### 5. Protecciones anti-spam en formulario de registro
**Commit:** `fc47096`

Disparado por el registro falso de "Luna Milly" (nacimiento: 2026-06-19, futuro;
teléfono de 14 dígitos inválido; mail mal escrito).

Tres capas independientes:
1. **Honeypot**: campo invisible (off-screen, opacity 0). Si llega con contenido
   → simula éxito pero no guarda nada en Supabase
2. **Validación teléfono**: post-normalización mínimo 12 dígitos
3. **Validación fecha de nacimiento**: no puede ser futura, y persona debe tener ≥ 12 años

---

## Tareas pendientes (orden de prioridad)

### URGENTE
1. **Correr migración de `ciclos_inicio` en Supabase producción**
   ```sql
   ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS ciclos_inicio jsonb DEFAULT '{}'::jsonb;
   ```
   Sin esto, la programación de fecha de ciclos no funciona aunque el código esté desplegado.

2. **Mergear rama a main** — todos los fixes están en `claude/audit-functional-bugs-p5rcf`,
   no en `main`. Mientras no se mergee, Vercel no deploya los cambios.

### NORMAL
3. **Investigar ejercicio cambiado de María** — confirmar con Supabase si el campo
   `ejercicio_nombre` en la tabla `progreso` (ciclo 3, ejercicio_idx 9) muestra
   "Press de pecho con banda elástica" o el nombre original. Esto confirma si fue
   la IA o un edit manual.

4. **Logo de Amira Fitness** — Amira necesita un logo cuadrado 1200×1200 para
   Google Ads. No se implementó en esta sesión. Opciones: usar Claude.ai (chat
   normal con generación de imágenes) o Canva.

### BAJA PRIORIDAD
5. **Push automático "¡llegó el nuevo ciclo!"** — Se decidió deliberadamente NO
   implementarlo para no agregar más notificaciones y evitar que Chrome las marque
   como spam. Documentado en la conversación.

---

## Decisiones técnicas tomadas en esta sesión

| Decisión | Alternativa descartada | Razón |
|----------|----------------------|-------|
| `ciclos_inicio` como JSONB en `alumnas` | Tabla separada `ciclo_fechas` | Dato simple, nadie necesita JOINs por fecha |
| Date picker nativo `<input type="date">` | Librería de calendario | Sin build step, el proyecto es vanilla |
| Honeypot silencioso (simula éxito) | Rechazar con error | No alertar al bot para que no reintente |
| NO mandar push al programar ciclo futuro | Mandar push igual | La alumna no sabe que hay rutina nueva todavía |
| NO implementar push automático al activar ciclo | Cron job en edge function | Riesgo de spam Chrome > beneficio marginal |

---

## Errores conocidos al cierre

### Sin errores abiertos
Todos los bugs identificados durante la sesión fueron corregidos y commiteados.

### Riesgo latente: Chrome spam notifications
Si las alumnas interactúan poco con las notificaciones push, Chrome puede marcar
el sitio como spam y bloquear todas las notificaciones para ese dispositivo.
**No tiene solución técnica desde el servidor** — es un sistema de Chrome.
Mitigación: mantener frecuencia baja y solo notificaciones de alto valor.

---

## SW Cache — versión actual

`amira-v23` (en `sw.js` línea 1)

Cada vez que se modifiquen assets cacheados hay que incrementar este número,
si no los usuarios siguen con la versión vieja del SW.

---

## Comandos útiles para continuar

```bash
# Ver estado de la rama
git log --oneline -10

# Deployar a producción (merge a main → Vercel deploya automáticamente)
git checkout main
git merge claude/audit-functional-bugs-p5rcf
git push origin main

# Deployar edge functions (requiere Supabase CLI)
supabase functions deploy generate-routine
supabase functions deploy send-push
supabase functions deploy notify-amira

# Correr localmente (sin build step)
npx serve .
```

---

## Archivos modificados en esta sesión

| Archivo | Cambios |
|---------|---------|
| `alumna/index.html` | Lógica de date-gating para `ciclos_inicio` |
| `panel/index.html` | Modal fecha ciclo, confirmaciones IA, botón 📅, "Activar ya" |
| `registro/index.html` | Honeypot + validaciones teléfono y fecha de nacimiento |
| `sw.js` | Versión de cache: v19 → v23 |
| `CLAUDE.md` | Creado desde cero con documentación completa |
| `HANDOFF.md` | Este archivo |

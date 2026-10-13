# CLAUDE.md — Amira Fitness

Documentación técnica completa para continuar el desarrollo sin perder contexto.

---

## Qué es este proyecto

**Amira Fitness** es una plataforma de entrenamiento personalizado online, construida para una sola entrenadora personal (Amira Lezcano) y sus alumnas. No es un SaaS genérico: cada decisión de diseño asume que hay exactamente una trainera y un número pequeño de alumnas (~15–20).

Hay dos apps:
- **Panel** (`/panel`): interfaz privada de Amira para crear rutinas, ver progreso, gestionar alumnas, enviar mensajes.
- **App de alumna** (`/alumna/{slug}`): app PWA que cada alumna usa en su celular para ver y registrar sus entrenamientos.

El proyecto es una **PWA monolítica sin framework**. No hay React, Vue, ni build step. Todo es HTML + JS vanilla + CSS en archivos únicos. Esto es intencional: facilita que Amira o un Claude futuro puedan leer y modificar sin toolchain.

---

## Estructura de archivos

```
/
├── alumna/index.html       # App de alumnas (PWA completa, ~4000 líneas)
├── panel/index.html        # Panel admin de Amira (~4500 líneas)
├── registro/index.html     # Formulario público de inscripción
├── ficha/index.html        # Ficha de evaluación de alumna
├── bio/index.html          # Link-in-bio de Amira (para Instagram)
├── instalar/index.html     # Guía de instalación de la PWA
├── index.html              # Landing page pública
├── sb.js                   # Cliente REST de Supabase (compartido)
├── sw.js                   # Service Worker (caché offline + push)
├── manifest.json           # PWA manifest (alumna)
├── api/
│   ├── manifest.json       # PWA manifest alternativo
│   ├── panel-manifest.json # PWA manifest del panel
│   ├── offline.html        # Página offline del SW
│   ├── seed.json           # Datos semilla
│   └── supabase.js         # Config de Supabase (api/)
├── migrations/             # ~45 archivos SQL de historial de schema
├── supabase/functions/     # Edge Functions en Deno/TypeScript
│   ├── send-push/          # Envío de push a alumnas
│   ├── notify-amira/       # Notificar a la trainera
│   ├── generate-routine/   # Generar rutinas con Claude AI
│   ├── classify-exercises/ # Clasificar ejercicios con Claude AI
│   ├── update-auth-email/  # Admin: cambiar email de alumna
│   └── weekly-summary/     # Resumen semanal automático
├── vercel.json             # Config de deployment (rewrites, headers)
├── .well-known/assetlinks.json  # Android TWA app linking
└── MAKE_INSTRUCCIONES.md   # Guía de automatizaciones con Make.com
```

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML + CSS + JS vanilla, sin framework |
| Backend / DB | Supabase (Postgres + Auth + Storage + Realtime) |
| Edge Functions | Deno TypeScript en Supabase |
| IA | Claude Opus 4.7 (rutinas), Claude Haiku 4.5 (clasificación) |
| Hosting | Vercel (deploy automático desde GitHub) |
| Push notifications | Web Push API nativa (RFC 8291, VAPID) |
| PWA | Service Worker con estrategias network-first/cache-first |
| Automatizaciones | Make.com (WhatsApp reminders vía CallMeBot/Twilio) |

---

## Credenciales y entorno

No hay `.env` local. Todas las claves están embebidas directamente en `sb.js` (son claves públicas de Supabase — el acceso real está controlado por Row Level Security):

```javascript
// sb.js
const SB_URL = 'https://aywkeoxwybzcexaichtv.supabase.co';
const SB_KEY = 'sb_publishable_8j3ihLED6ui6L32T0QQ5EQ_soH0TSQb'; // anon key pública
```

Las claves secretas (VAPID, ANTHROPIC_API_KEY) viven en Supabase Secrets y solo son accesibles desde las Edge Functions en runtime. Nunca están en el cliente.

**Cómo correrlo localmente:** abrir los archivos directamente en el browser o usar `npx serve .` desde la raíz. No hay build step ni `npm install`. Para probar las Edge Functions se necesita `supabase functions serve` con el CLI de Supabase.

**Deployment:** push a `main` → Vercel deploya automáticamente. Las Edge Functions se despliegan con `supabase functions deploy <nombre>`.

---

## Base de datos — tablas principales

| Tabla | Para qué sirve |
|-------|---------------|
| `alumnas` | Perfil completo de cada alumna: nombre, slug, nivel, equipamiento, ciclo actual, nombres de ciclos, fechas de inicio de ciclos, objetivos, lesiones, estado |
| `rutinas` | Plan de entrenamiento. Una fila por (alumna_id, ciclo, semana, dia). El campo `ejercicios` es JSONB con el array de ejercicios del día |
| `progreso` | Un registro por ejercicio completado: (alumna_id, ciclo, semana, dia, ejercicio_idx). Guarda hecho, peso_kg, rpe, nota |
| `ejercicios_biblioteca` | Biblioteca global de ejercicios con clasificación: patrón de movimiento, nivel, equipamiento, posición, bilateral, impacto |
| `feedbacks` | Reportes de la alumna: dolor, energía, forma, check de video |
| `comentarios` | Notas de Amira ancladas a un día específico (ciclo, semana, dia) |
| `notas_sesion` | Notas libres que la alumna deja después de entrenar |
| `peso_alumna` | Log de peso corporal con fecha |
| `pagos` | Estado de pago mensual por alumna |
| `registros` | Formularios de inscripción recibidos |
| `push_subscriptions` | Endpoints Web Push de alumnas |
| `amira_push_subscriptions` | Endpoints Web Push de Amira (trainera) |
| `plantillas` | Plantillas de texto reutilizables para mensajes |
| `avisos` | Anuncios que aparecen en la app de alumnas |

---

## Autenticación

**Panel (Amira):**
- Email + password via Supabase Auth
- Email hardcodeado: `amiralezcano@gmail.com`
- Fallback local: `localStorage.getItem('af-pwd')` (default `"amira2025"`)
- Tokens en localStorage: `af-access-token`, `af-refresh-token`, `af-token-expires`

**App alumna:**
- Magic link o password via Supabase Auth
- Tokens en localStorage: `af-alumna-token`, `af-alumna-refresh`, `af-alumna-expires`
- Si no hay token, usa la anon key pública (acceso limitado por RLS)

`getSBH()` en `sb.js` inyecta el token correcto en cada request según qué localStorage está disponible.

---

## Sistema de ciclos — decisión técnica clave

El entrenamiento se organiza en **ciclos** (generalmente mensuales). Cada alumna tiene:

```json
{
  "ciclo_actual": 3,
  "ciclos_nombres": {"1": "Abril", "2": "Mayo", "3": "Junio"},
  "ciclos_inicio": {"3": "2026-07-01"}
}
```

**`ciclos_inicio` (implementado Jun 2026):** permite a Amira crear el próximo ciclo con anticipación sin que la alumna lo vea hasta la fecha pactada. La app de alumna calcula el ciclo efectivo así:

```javascript
// alumna/index.html — renderAlumna()
const _hoyStr = 'YYYY-MM-DD';
while(_cicloTope > 1){
  const _ini = _ciclosInicio[_cicloTope];
  if(_ini && _ini > _hoyStr){ _cicloTope--; continue; } // fecha futura → no mostrar
  break;
}
const cicloActual = _cicloTope;
```

Regla importante: ciclos **sin** `ciclos_inicio` se activan de inmediato (backward compatible).

**Transición de ciclo:** cuando hay un ciclo nuevo que la alumna no empezó, aparece el ciclo anterior como pestaña para que pueda terminar lo que le faltó. La pestaña desaparece sola cuando marca el primer ejercicio del ciclo nuevo.

---

## Edge Functions — cómo funcionan

### `generate-routine` (Claude Opus 4.7)
La más compleja. Recibe `{alumna_id, semanas=4, instrucciones=""}` y:
1. Fetcha perfil de la alumna, biblioteca de ejercicios, rutinas anteriores, historial de progreso, feedbacks.
2. Construye un system prompt cacheado (~1800 tokens) con todas las reglas de programación (restricciones de equipamiento, nivel, patrones de movimiento, periodización S1-base/S2-progresión/S3-peak/S4-deload, etc.).
3. Llama a Claude con `max_tokens = min(32768, max(8192, numSesiones * 1800))`.
4. Extrae y repara JSON si la respuesta fue truncada.
5. Valida que estén todas las semanas/días.
6. Devuelve `{routine, usage, alumna}`.

### `send-push` (Web Push nativo)
Implementa Web Push RFC 8291 (aes128gcm) con VAPID. No usa librerías externas.
- `alumna_id` opcional: si se omite, envía a todas.
- `filter_by_day`: solo envía si la alumna entrena ese día de la semana.
- Auto-limpia endpoints 410/404 (suscripciones vencidas).

### `notify-amira`
Se llama con `sbNotifyAmira(table, record)` desde el cliente cuando una alumna hace algo importante (feedback, nota de sesión, comentario). Rutea el evento a un push para Amira.

### `classify-exercises` (Claude Haiku 4.5)
Batch classification de ejercicios. Rápida y barata. Devuelve patrón de movimiento, nivel, equipamiento, posición, bilateral, impacto.

### `weekly-summary`
Cron job (Make.com o pg_cron). Computa: alumnas activas, las que entrenaron esta semana, las que necesitan atención, reportes de dolor. Envía resumen a Amira vía push.

---

## Service Worker

Versión actual: la de la primera línea de `sw.js` (`const CACHE = 'amira-vN'`; `amira-v63` al 13/10/2026). Incrementarla con cada deploy que cambie assets cacheados.

Estrategias:
- **Supabase API:** siempre network, fallback `[]` si offline.
- **CDN (Google Fonts, etc.):** cache first.
- **Assets propios:** network first → cache → `offline.html`.
- **Background sync:** tag `sync-progreso` para sincronizar progreso marcado offline.

---

## Flujos principales

### Una alumna se inscribe
1. Completa el form en `/registro`.
2. Amira recibe notificación push y lo aprueba desde el panel.
3. Amira crea la ficha de alumna, genera la rutina (manual o con IA).
4. La alumna accede vía `/alumna/{slug}` con su email.
5. Amira le manda desde la ficha (💬 WA) la plantilla "👋 Bienvenida y cómo entrar": link, email, PIN (la fecha de nacimiento en DDMMAA, `pinDesdeNacimiento`) y la guía de `/instalar`.

**Primer ingreso a la app (desde el 13/10/2026):** una introducción de 3 pantallas y después los carteles de instalar, notificaciones y días de entrenamiento **de a uno**: pasan por `pedirCartel()`, que espera a que termine la introducción y a que se cierre el cartel anterior. Un cartel nuevo tiene que pasar por ahí y llamar a `siguienteCartel()` al cerrarse; si no, vuelven a salir encimados. Si tiene notificaciones pero no eligió días, la app se los pide como mucho una vez por semana.

**Bajas y pausas:** al pasar a una alumna a Pausada o Baja, el panel pide el motivo y lo guarda en la última entrada de `alumnas.estado_log` (`{estado, fecha, motivo, nota}`; motivos: `tiempo`, `dinero`, `salud`, `motivacion`, `no_responde`, `otro`). En Alumnas → Bajas se ve cuántas hay por motivo, y "+ Motivo" anota el de una baja vieja.

### Una alumna entrena
1. Ve `rutinas[ciclo][semana][dia]` renderizado en la app.
2. Ejecuta ejercicios, marca cada uno con `progreso` (hecho, peso, RPE).
3. Al completar la semana entera: push de celebración.
4. Al completar el ciclo: overlay de cierre con botón para escribirle a Amira (o la fecha del próximo, si ya está programado) y una tarjeta de espera en la rutina hasta que llegue el siguiente.

**Sesión corta (desde el 13/10/2026):** si la alumna elige 15 o 30 minutos y marca todos los ejercicios que entran (`cuantosEntran`), cuenta como día entrenado: festejo propio, "¿Cómo te fue?", ✓ en el calendario de constancia y último entrenamiento. Se anota en `localStorage` (`af-corta-…`) y en la base como un `feedbacks` `dia_completo` cuya nota empieza con "Sesión corta de N min" (así le llega el aviso a Amira y la ven los otros teléfonos). No cuenta como avance del plan del ciclo, que sigue pidiendo el 80% del día.

### Mediciones
- **La alumna `id = 3` es la cuenta con la que entrena Amira.** Figura como activa, así que el panel y el resumen la cuentan; para métricas de alumnas, excluirla.
- **Días planificados sin empezar** (punto de partida de la sesión corta, 13/10/2026): en las semanas que la alumna ya dejó atrás (marcó algo en una semana posterior) y que se cerraron en los últimos 28 días, 62 de 154 días (40%) no tenían ningún ejercicio marcado; 15 a medias y 77 completos. En todo el historial, 38%. Se mide con las tablas `rutinas` y `progreso`: cada día de rutina con ejercicios de una semana cerrada cuenta como planificado, y "cerrada" es la fecha de la primera marca en una semana posterior. Repetir a las 4 semanas del cambio con el mismo criterio.

### Amira crea un nuevo ciclo
1. En panel → Rutinas → selecciona alumna → "Nuevo ciclo".
2. Elige nombre, fecha de inicio (hoy = activo ya, futuro = programado), mensaje, opción de subir cargas %.
3. El sistema copia la rutina del ciclo anterior, resetea checks.
4. Si la fecha es hoy: envía push a la alumna. Si es futura: no envía (la alumna lo verá sola cuando llegue la fecha).

---

## Decisiones técnicas y por qué

**Sin framework:** la app es usada por una sola persona entrenadora. Agregar React/Vue introduce build steps, dependencias que vencen, y complejidad innecesaria. El tradeoff (archivos HTML grandes) es aceptable para el tamaño del proyecto.

**Sin variables de entorno en cliente:** la SB_KEY es la anon key pública de Supabase, intencionalmente pública. La seguridad real está en Row Level Security (RLS) del lado de Postgres, y solo vale si las políticas no dejan pasar a cualquiera: ver "RLS" en Problemas conocidos.

**Ciclos como números enteros, no fechas:** permite ciclos de cualquier duración (no forzosamente mensuales) y simplifica las queries.

**`ciclos_inicio` como JSONB en `alumnas`:** evita una tabla separada para un dato simple. El tradeoff es que no se puede hacer JOIN por fecha de ciclo, pero nadie necesita eso.

**Push nativo sin Firebase:** Firebase Cloud Messaging agrega dependencia de Google y complejidad. Web Push nativo funciona igual en Chrome/Edge/Firefox/Safari (iOS 16.4+).

**Claude con prompt caching:** el system prompt de `generate-routine` es idéntico para todas las alumnas. Con prompt caching de Anthropic se paga el 10% del costo en tokens de input en llamadas subsecuentes del mismo bloque cacheado.

---

## Cosas que NO hacer

- **No usar `git push --force` a `main`** sin confirmación explícita del usuario.
- **No agregar frameworks o build steps** (React, Vite, Webpack, etc.). El proyecto es vanilla por diseño.
- **No crear archivos `.md` de documentación adicionales** salvo que el usuario lo pida.
- **No exponer** `ANTHROPIC_API_KEY` ni las VAPID private keys en código cliente.
- **No cambiar el esquema de `rutinas`** (alumna_id, ciclo, semana, dia, ejercicios JSONB) sin migración — es la estructura central de la app.
- **No asumir que `ciclos_inicio` existe en la DB** sin correr la migración: `ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS ciclos_inicio jsonb DEFAULT '{}'::jsonb;` — el código cliente tiene fallbacks para cuando no existe, pero idealmente se corre la migración.
- **No agregar más notificaciones push** sin considerar el riesgo de que Chrome las marque como spam. Menos es más.
- **No tocar `sw.js`** sin incrementar la versión del cache (`amira-vN`). Si no se incrementa, los usuarios siguen con el SW viejo cacheado.
- **No mostrar con `innerHTML` texto que no escribió Amira sin pasarlo por `esc()`**: inscripciones y fichas (las llena cualquiera), visitas, reportes, comentarios y notas de alumnas, avisos y la foto. El panel guarda la sesión de Amira: un texto con código que se ejecute ahí se lleva su acceso a todos los datos. Hasta el 13/10/2026 el panel mostraba casi todo eso sin escapar.

---

## Migraciones pendientes

Estas columnas fueron agregadas por código pero pueden no existir en la DB de producción todavía:

```sql
-- Necesaria para el sistema de programación de ciclos (Jun 2026)
ALTER TABLE alumnas ADD COLUMN IF NOT EXISTS ciclos_inicio jsonb DEFAULT '{}'::jsonb;
```

Para correrla: Supabase Dashboard → SQL Editor → ejecutar.

---

## Branch de trabajo actual

`claude/audit-functional-bugs-p5rcf` — contiene features de Jun 2026:
- Sistema de fecha de inicio por ciclo (`ciclos_inicio`)
- Modal con date picker para editar fecha de ciclo
- Botón "Activar ya" que guarda y cierra en un click

---

## Problemas conocidos

**Chrome spam warning en notificaciones push:** Chrome puede marcar las notificaciones del sitio como "posible spam" si los usuarios no interactúan con ellas frecuentemente. No hay forma de prevenir este comportamiento desde el servidor — es un sistema del browser. Si una alumna la marca como spam, Chrome bloquea todas las notificaciones del sitio en ese dispositivo. Mitigación: mantener frecuencia baja y notificaciones de alto valor.

**`ciclos_inicio` sin migración:** si la columna no existe en producción, el panel muestra error silencioso (el código tiene try/catch que omite el campo). La solución es correr la migración de arriba.

**RLS: hasta el 12/10/2026 casi todas las tablas estaban abiertas.** Las políticas permisivas se suman (OR), así que bastaba una con `USING (true)` para que cualquiera con la anon key (que está en `sb.js`) pudiera leer, modificar y borrar. La app de alumna exige ingresar (email + PIN) antes de cargar datos, así que cada alumna puede operar viendo solo lo suyo.

- **Cerradas el 12/10/2026:** `alumnas` (Amira todo; cada alumna lee y actualiza solo su fila por `lower(email) = lower(auth.email())`) y `comentarios` (Amira todo; cada alumna solo los suyos). Ver `migrations/rls_alumnas_1_funciones.sql` y `rls_alumnas_2_permisos.sql`. Marcha atrás de emergencia: `rls_alumnas_2_marcha_atras.sql`.
- **Cerrada el 12/10/2026:** `registros` (Amira todo; sin sesión solo se puede insertar una fila de tipo `registro` o `ficha_salud` con estado `pendiente` o `aprobado`, sin leer, modificar ni borrar). El formulario y la ficha insertan con `sbInsertSinRespuesta` (`return=minimal`): pedir la fila de vuelta exige permiso de lectura y el insert fallaría. Ver `migrations/rls_registros_permisos.sql` y su marcha atrás.
- **Cerradas el 12/10/2026:** `rutinas` (Amira todo; cada alumna solo lee las suyas) y `progreso` (Amira todo; cada alumna lee y guarda lo suyo, incluido el upsert sobre `progreso_unique`). Ninguna página previa al ingreso las usa, el generador de rutinas usa la clave de servicio, y el service worker no escribe: le avisa a la app abierta que sincronice. Ver `migrations/rls_rutinas_progreso_permisos.sql` y su marcha atrás.
- **Cerradas el 13/10/2026:** `peso_alumna` y `push_subscriptions` (Amira todo; cada alumna lo suyo), `feedbacks` (Amira todo; cada alumna lee y crea los suyos, sin editar ni borrar), `avisos` (Amira todo; cada alumna lee los de `para = 'todas'` y los de su slug), `plantillas`, `pesos` y `fichas_salud` (solo Amira; las dos últimas están vacías y sin uso) y la lectura de `page_views` (solo Amira). Hasta ese día cualquier cuenta con sesión, no solo las alumnas, leía todos los reportes y publicaba avisos. Ver `migrations/rls_ultimas_tablas_permisos.sql` y su marcha atrás.
- **Abiertas a propósito:** leer `ejercicios_biblioteca` (sin datos personales; la app la usa), insertar en `page_views` (las visitas de la landing, la bio y el formulario, que mandan `return=minimal`) e insertar inscripciones en `registros`.
- **Cada alumna solo puede cambiar de su fila de `alumnas` `last_active_at`, `foto` y `dias_disponibles`**: lo frena el trigger `alumnas_limitar_cambios`, que no aplica a Amira, a las Edge Functions ni a las funciones `security definer`. Si la app tiene que cambiar otra columna, agregarla ahí.
- **Activar notificaciones pasa por `guardar_suscripcion(alumna_id, endpoint, p256dh, auth)`** (`security definer`, solo con sesión): un celular tiene una sola suscripción, y si ya era de otra alumna se la pasa a quien la activa.
- **Lo previo al ingreso pasa por funciones `security definer`** que devuelven lo justo: `alumna_registrada(email)` (sí/no, al crear el PIN), `ficha_alumna(slug)` y `ficha_guardar(slug, lesiones, tel)` (ficha de salud). Nunca exponer `nacimiento`: es el PIN de ingreso.
- **Antes de abrir o crear una tabla**, revisar también qué puede hacer cualquier cuenta con sesión: crear una cuenta es libre, así que `to authenticated using (true)` deja pasar a cualquiera, no solo a las alumnas.
- Cada tabla nueva tiene que nacer con RLS activado y sin políticas `USING (true)`.
- Los emails de `alumnas` se guardan en minúscula: el de ingreso siempre llega en minúscula.

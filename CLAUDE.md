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

**Qué se publica:** Vercel publica en amirafitness.com.ar todo lo que está en el repo, salvo lo que figura en `.vercelignore`: notas técnicas, migraciones, funciones del servidor, `.claude/` y la carpeta del sistema de diseño (desde el 14/10/2026: tenía copias viejas del panel y de la app). Hasta el 13/10/2026 este archivo se podía leer desde el sitio. Un archivo nuevo que no sea para el sitio va en esa lista.

**Permisos de Claude (`.claude/settings.json`, 13/10/2026):** las sesiones de este repo trabajan sin pedir permiso a cada paso, salvo para cambiar la base: el SQL que escribe o borra, `apply_migration` y `deploy_edge_function` pasan por `.claude/hooks/preguntar_si_cambia_la_base.py`, que le pregunta a Aaron y le explica el motivo en el cartel. No sacar ese control. Solo vale en sesiones con un único repositorio.

---

## Base de datos — tablas principales

| Tabla | Para qué sirve |
|-------|---------------|
| `alumnas` | Perfil completo de cada alumna: nombre, slug, nivel, equipamiento, ciclo actual, nombres de ciclos, fechas de inicio de ciclos, objetivos, lesiones, estado, cómo llegó (`origen`). La alumna lee su propia fila: lo que no debe ver va en `alumnas_privado` |
| `alumnas_privado` | Lo que Amira escribe de cada alumna y la alumna no ve: notas privadas (🔒) e historial de pausas y bajas (`estado_log`). Solo Amira (14/10/2026) |
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
| `plantillas` | Plantillas de rutina (estructura de días y ejercicios para copiar a una alumna) |
| `plantillas_mensajes` | Plantillas de WhatsApp del panel, una fila por conjunto (`alumna` y `general`): el celular y la compu de Amira usan los mismos textos |
| `avisos` | Anuncios que aparecen en la app de alumnas |
| `page_views` | Visitas a la web y clics a WhatsApp, con su origen: `/`, `/registro`, `/notas/…`, `/bio/view`, `/bio/<link>`, `/wa`, `/registro/wa` y `/notas/wa`. Cualquiera puede insertar; solo Amira lee |

---

## Autenticación

**Panel (Amira):**
- Email + password via Supabase Auth
- Email hardcodeado: `amiralezcano@gmail.com`
- No hay contraseña local: la tarjeta "Contraseña del panel" de Config guardaba `af-pwd` en el teléfono, el ingreso nunca la usó y se sacó el 13/10/2026. La contraseña se cambia en Supabase Auth.
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

**Nombre del ciclo (13/10/2026):** sale de su fecha de inicio (`nombreDeCiclo`): el mes donde cae la mayor parte de sus 4 semanas, con el año ("Octubre 2026"). Si el ciclo anterior ya tiene ese mes, va el siguiente. Lo usan "Nuevo ciclo" y el generador con IA, que proponía siempre el mes que viene: una alumna que arrancó el 7/10 veía "Noviembre 2026".

**Semana 0 = calentamiento propio de la alumna:** no es un día de entrenamiento. No cuenta en el avance del ciclo, ni hace que un ciclo "tenga rutina" (`_tieneEjercicios` en el panel, `getCiclos` en la app). Hasta el 13/10 la rutina con IA de una alumna nueva caía en el ciclo 2 porque el 1 tenía el calentamiento, y la app le mostraba un "Ciclo 1" vacío.

**Transición de ciclo:** cuando hay un ciclo nuevo que la alumna no empezó, aparece el ciclo anterior como pestaña para que pueda terminar lo que le faltó. La pestaña desaparece sola cuando marca el primer ejercicio del ciclo nuevo.

---

## Edge Functions — cómo funcionan

**Quién puede llamarlas (desde el 14/10/2026):** `send-push`, `notify-amira`, `generate-routine`, `classify-exercises` y `weekly-summary` miran la credencial (`Authorization: Bearer …`) con `quienLlama`: la clave de servicio, la sesión de Amira o la de una alumna. La clave pública y cualquier otra cuenta reciben 401. Hasta ese día `send-push` y `notify-amira` aceptaban cualquier llamada: cualquiera podía mandarles una notificación a todas las alumnas. `update-auth-email` ya aceptaba solo a Amira.
- `send-push`: clave de servicio y Amira. Una alumna solo se puede mandar a sí misma (el festejo de semana completa).
- `notify-amira`: clave de servicio y alumnas. El aviso de una alumna sale siempre con su nombre.
- `generate-routine` y `classify-exercises`: solo Amira, porque usan la IA, que se paga.
- `weekly-summary`: clave de servicio y Amira.
- Con `{"probar": true}`, `send-push`, `notify-amira` y `weekly-summary` responden quién llama y a cuántos les mandarían, sin mandar nada. Para una alumna no vale.
  - `weekly-summary` además arma y firma la notificación de cada dispositivo sin mandarla: `listos` dice cuántas saldrían y `error`, por qué no.
  - Hasta el 21/10/2026 la prueba no firmaba: daba bien y el envío de verdad fallaba.
- **Probar con el mismo Deno que Supabase:** el 2.1.4 (`served_by` en los logs de cada función). Uno más nuevo acepta cosas que ahí fallan: el resumen del domingo firmaba bien con el Deno 2.9 y en Supabase no.
- Las llaman solas, con la clave de servicio:
  - el cron `push-recordatorios-diarios`, a las 9, con `filter_by_day`;
  - el cron `amira-resumen-semanal`, el domingo a las 22;
  - los webhooks de `feedbacks`, `registros` y `notas_sesion`, que llaman a `notify-amira`.
  Los `comentarios` de la alumna avisan desde la app (`sbNotifyAmira`).
- `verify_jwt` está apagado en `send-push` y `notify-amira` y prendido en las otras. Hay que mantenerlo así al desplegar.
- **Claves (14/10/2026):**
  - Desde el 18/4/2026 Supabase rechaza en el encabezado `apikey` las claves viejas (anon y service_role, los JWT que empiezan con `eyJ`): "Legacy API keys are disabled".
  - Como credencial (`Authorization: Bearer`) siguen valiendo. Es la que tienen guardada los dos crons y los tres webhooks.
  - Las funciones tienen en el entorno las claves nuevas, así que la vieja no es igual a `SUPABASE_SERVICE_ROLE_KEY`.
  - `quienLlama` la reconoce pidiendo `/auth/v1/admin/users` con la clave del entorno en `apikey`. Hasta el arreglo la mandaba en `apikey`, y el cron y los avisos de la base quedaban rechazados.
  - Un cron o webhook nuevo usa la misma clave que `push-recordatorios-diarios`.
- **Probar sin mandar nada:** desde el SQL Editor, `net.http_post` con la clave del cron y `{"probar": true}`, y después leer el resultado en `net._http_response`.
- **El cron del domingo:** hasta el 14/10/2026 tenía el texto `<SERVICE_ROLE_KEY>` en lugar de la clave.

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
La llaman los webhooks de la base cuando entra un reporte, una inscripción o una nota de sesión, y la app con `sbNotifyAmira(table, record)` cuando la alumna deja un comentario. Rutea el evento a un push para Amira.

### `classify-exercises` (Claude Haiku 4.5)
Batch classification de ejercicios. Rápida y barata. Devuelve patrón de movimiento, nivel, equipamiento, posición, bilateral, impacto.

### `weekly-summary`
Cron job (Make.com o pg_cron). Computa: alumnas activas, las que entrenaron esta semana, las que necesitan atención, reportes de dolor y las que están en sus primeras dos semanas. Envía resumen a Amira vía push. `calcularResumen` usa las mismas reglas que "Hoy hay que atender" del panel: si cambia una, cambiar la otra y volver a desplegar la función.
- **Hasta el 21/10/2026 el resumen no le llegaba a Amira.**
  - Hasta el 14/10 el cron no tenía la clave.
  - El 18/10, la primera vez que corrió con la clave, falló al firmar la notificación. Armaba la clave privada como PKCS8 sin la parte pública, y el Deno de Supabase la importa pero no firma con ella ("InvalidEncoding").
  - Ahora firma como `send-push` y `notify-amira` (JWK con la parte pública).
- Cada corrida deja en los logs de la función `[weekly-summary] sent=N/M` con el texto del resumen. La respuesta en `net._http_response` dura unas 6 horas.
- No cuenta la cuenta con la que entrena Amira (`CUENTA_DE_AMIRA`), igual que el Inicio (21/10/2026).

---

## Service Worker

Versión actual: la de la primera línea de `sw.js` (`const CACHE = 'amira-vN'`; `amira-v78` al 26/10/2026). Incrementarla con cada deploy que cambie assets cacheados.

Estrategias:
- **Supabase API:** siempre network, fallback `[]` si offline.
- **CDN (Google Fonts, etc.):** cache first.
- **Assets propios:** network first → cache → `offline.html`.
- **Background sync:** tag `sync-progreso`. El service worker no escribe: le avisa a la app abierta que mande la cola.

**Sin conexión en la app de alumna (14/10/2026):** lo que no se pudo guardar queda en la cola (`af-sync-queue`) y sale solo:
- Sale al volver la señal, a los 20 segundos si falló con señal, al abrir la app y al volver a entrar.
- Antes de mandar, la app renueva la sesión si venció.
- Los reportes ("Reportar", y "¿Cómo te fue?") entran a la cola como cualquier otra cosa. Hasta ese día decía "gracias por avisar" y el reporte se perdía.
  - Si un reporte no sale, se resuelve en silencio, con el mensaje de siempre (decidido con Aaron: avisar que falló preocupa a la alumna sin que pueda hacer nada).
  - La excepción es "🚨 Algo me preocupa". La app le promete que Amira la va a contactar, y sin saber que no salió se quedaría esperando.
  - Por eso ve el cartel "Tu aviso quedó guardado", con un botón para escribirle a Amira por WhatsApp. Cuando sale, la app confirma "Tu aviso le llegó a Amira".
- La cola tiene tope de 50, pero nunca descarta un insert (reportes, días completos). El mismo ejercicio guardado varias veces queda como una sola operación.
- Sin señal, la app no cierra la sesión: ni al abrirla ni con el refresco de cada 5 minutos.
  - Hasta el 14/10, después de una hora sin señal pedía el PIN, y en el gimnasio la alumna no podía ni entrenar ni avisar.
  - Solo la saca si el servidor rechaza la sesión.

---

## Flujos principales

### Una alumna se inscribe
1. Completa el form en `/registro`.
2. Amira recibe notificación push y lo aprueba desde el panel.
3. Amira crea la ficha de alumna, genera la rutina (manual o con IA).
4. La alumna accede vía `/alumna/{slug}` con su email.
5. Al crear la alumna, el editor de rutinas vuelve a su ciclo 1, semana 1, día 1. Antes quedaba la semana de la alumna anterior: el 20/9 a una nueva le quedó toda la rutina en la semana 4. Si la semana 1 de un ciclo está vacía y hay ejercicios en otra, Rutinas lo avisa.
6. Amira le manda desde la ficha (💬 WA) la plantilla "👋 Bienvenida y cómo entrar": link, email, PIN (la fecha de nacimiento en DDMMAA, `pinDesdeNacimiento`) y la guía de `/instalar`.

**Arranque guiado (desde el 13/10/2026):** durante sus primeros 14 días (`DIAS_ARRANQUE`), cada alumna aparece en Inicio → "🌱 Primeras dos semanas".
- Pasos: bienvenida, entró a la app, eligió sus días, notificaciones, primer entrenamiento, mensaje del día 3 y mensaje del día 7.
- Botón con el próximo mensaje que toca. Mientras no entre a la app, solo "¿Pudiste entrar?", un día después de la bienvenida y cada dos días.
- Si ya entró a la app, la bienvenida cuenta como hecha, aunque no haya registro del envío. Desde el día 7, el mensaje del día 3 que no se mandó queda salteado y toca el del día 7.
- Los mensajes son las plantillas `o_entrar`, `o_dia3`, `o_dia3b` y `o_dia7` (`[arranque]` dice cuántos entrenamientos hizo). El prefijo `o_` las deja editables en Recordatorios sin llenar el menú de WhatsApp de la ficha.
- Cada envío queda en `contactos`, con motivo `ingreso`, `arranque3` o `arranque7`.
- "Entró a la app" sale de `ingresos_alumnas()`, que devuelve el último ingreso de `auth.users` solo a Amira. Si no responde, cuenta cualquier cosa que solo se hace adentro de la app.
- Mientras dura el arranque, la alumna no aparece en "Hoy hay que atender" ni en "Resto", y el resumen del domingo tampoco la cuenta para atender: dice "N en sus primeras dos semanas".

**Primer ingreso a la app (desde el 13/10/2026):** una introducción de 3 pantallas y después los carteles de instalar, notificaciones y días de entrenamiento **de a uno**: pasan por `pedirCartel()`, que espera a que termine la introducción y a que se cierre el cartel anterior. Un cartel nuevo tiene que pasar por ahí y llamar a `siguienteCartel()` al cerrarse; si no, vuelven a salir encimados. Si tiene notificaciones pero no eligió días, la app se los pide como mucho una vez por semana.

**Bajas y pausas:** al pasar a una alumna a Pausada o Baja, el panel pide el motivo y lo guarda en la última entrada de `alumnas_privado.estado_log` (`{estado, fecha, motivo, nota}`; motivos: `tiempo`, `dinero`, `salud`, `motivacion`, `no_responde`, `otro`). En Alumnas → Bajas se ve cuántas hay por motivo, y "+ Motivo" anota el de una baja vieja.

### Una alumna entrena
1. Ve `rutinas[ciclo][semana][dia]` renderizado en la app.
2. Ejecuta ejercicios, marca cada uno con `progreso` (hecho, peso, RPE).
3. Al completar la semana entera: push de celebración.
4. Al completar el ciclo: overlay de cierre con botón para escribirle a Amira (o la fecha del próximo, si ya está programado) y una tarjeta de espera en la rutina hasta que llegue el siguiente.

**Sesión corta (desde el 13/10/2026):** si la alumna elige 15 o 30 minutos y marca todos los ejercicios que entran (`cuantosEntran`), cuenta como día entrenado: festejo propio, "¿Cómo te fue?", ✓ en el calendario de constancia y último entrenamiento. Se anota en `localStorage` (`af-corta-…`) y en la base como un `feedbacks` `dia_completo` cuya nota empieza con "Sesión corta de N min" (así le llega el aviso a Amira y la ven los otros teléfonos). No cuenta como avance del plan del ciclo, que sigue pidiendo el 80% del día.

**Constancia (desde el 13/10/2026, decidido con Amira):** reemplaza las tres "rachas" que había, que volvían a cero con un corte. Son los días entrenados del mes contra los planificados, con meta de 3 de cada 4 (`META_CONSTANCIA`). Los planificados son sus días por semana repartidos en el mes; si empezó ese mes, se cuentan desde su primer entrenamiento. Día entrenado: el 80% de los ejercicios o una sesión corta completa. La pausa activa no cuenta y se muestra al lado. La cuenta está dos veces y tiene que dar lo mismo: `constanciaMes` en la app y `constanciaMesP` en el panel.
- Festejos: "mes constante" al llegar a la meta (una vez por mes en cada teléfono), "qué bueno que volviste" después de 7 días o más sin entrenar, y el primer entrenamiento.
- No hay festejo de récord de peso, también por decisión de Amira: la evolución ("empezaste con 10 kg, hoy 20 kg") se ve en Progreso → "Desde que empezaste".
- Lo que la alumna marca en la sesión entra a `DB.progresoRaw` (`anotarEnHistorial`), así la constancia y "hace cuánto no entrenás" se actualizan sin recargar.

**Pantalla del día (13/10/2026):**
- Al abrir la app, o al volver después de una hora, si el día elegido ya está hecho salta al siguiente pendiente (`proximoPendiente`). Las pestañas marcan con ✓ los días y las semanas hechos.
- Un ejercicio se marca solo con el círculo o con "Marcar hecho". Tocar el nombre abre la técnica, porque lo marcaba sin querer y guardaba el peso precargado.
- El festejo del día dice cuándo es el próximo entrenamiento y pregunta "¿Cómo te fue hoy?".
- El check-in semanal de Notas se sacó: se usó 5 veces en 70 días y duplicaba la revisión de los lunes.
- **Reportar (21/10/2026):** elegir una opción no manda el reporte. Se elige, se escribe si quiere y se toca Enviar.
  - Hasta ese día cada opción lo mandaba al tocarla, con el comentario abajo y todavía vacío. La que quería contar algo lo mandaba de nuevo.
  - Desde abril, 18 de 69 reportes de ejercicios habían sido repeticiones así (10 para agregar el comentario, de 5 alumnas), y cada uno le llegaba a Amira como un aviso más.
  - "Dolor muscular normal" dice "Músculos cargados o doloridos, como al día siguiente de entrenar". Decía "Ardor o agujetas": "agujetas" es de España y no se entendía, y "ardor" se confundía con el del momento. Un pinchazo o un dolor agudo va en "Molestia articular" o en "Algo me preocupa".
- **Pantalla prendida mientras entrena (14/10/2026, `mantenerPantalla`):**
  - El descanso dura 45 segundos y muchos celulares apagan la pantalla a los 30. Ella no veía la cuenta regresiva, no le llegaba la vibración y tenía que desbloquear para marcar el siguiente.
  - Desde el primer ejercicio que marca hasta que termina el día (o la sesión corta), la pantalla queda prendida (Screen Wake Lock).
  - Si no la toca en 10 minutos (`PANTALLA_MIN`), vuelve a lo normal.
  - Al volver a la app se pide de nuevo.
  - En un iPhone con la app instalada antes de iOS 18.4 no hace nada.
- El zoom está habilitado: no volver a poner `maximum-scale=1`. En el celular los campos tienen que tener letra de 16 px o más (lo fuerza un `@media (pointer:coarse)`); si no, el iPhone agranda la pantalla al tocarlos.

**Revisión semanal (lunes, decidido con Amira):** en Inicio aparece la lista de alumnas activas con lo que hizo cada una la semana anterior. No entran la cuenta de Amira ni las que todavía no eran alumnas cuando empezó la semana que se revisa (13/10/2026): en su primera semana tienen los mensajes del día 3 y del día 7, y la revisión empieza el lunes siguiente.
- "💬 Devolución" copia la plantilla `a_rev` (o `a_rev0` si no entrenó). `[semana]` trae los días, las pausas activas, los pesos que subió y cómo va el mes.
- La alumna queda revisada en `contactos` con motivo `revision`. Saltearla se guarda solo en el teléfono.
- Si la revisión no se termina el lunes, la lista sigue plegada el resto de la semana.

**Listas del panel (revisión con datos reales, 13/10/2026):**
- Con nombres repetidos (hay dos Paulas y dos Julietas) las listas y los selectores usan `nombreCorto`: el nombre de pila con la inicial del apellido ("Paula D."). Los selectores que aplican algo a una alumna (plantillas, avisos) muestran el nombre completo y no incluyen bajas. Los mensajes a la alumna siguen con `fn()`.
- "Hoy hay que atender" dice si la que nunca marcó un ejercicio entró a la app (`ingresos_alumnas()`); si no se pudo consultar, no afirma nada. Con poca adherencia agrega hace cuántos días no entrena.
- Recordatorios trabaja solo con alumnas activas: el check-in por inactividad y el resumen push mandan alumna por alumna, y `send-push` solo saltea a las bajas cuando manda a todas.
- Los días sin entrenar se cuentan en días de calendario en todo el panel (`localDayDiff`); "en 7 días" es hoy y los 6 anteriores.

**Inicio del panel (21/10/2026, decidido con Aaron):** ordenado por cuándo hay que hacer cada cosa. Eran 12 bloques seguidos, unas 5 pantallas de scroll, y lo de hoy quedaba mezclado con lo semanal y lo mensual.
- **Hoy:** atender, registros pendientes (inscripciones y fichas por separado), cumpleaños de hoy o mañana, primeras dos semanas, entrenaron hoy y, los lunes, la revisión semanal.
- **Esta semana:** la revisión (el resto de la semana), ciclos por renovar, cumpleaños de los próximos días y subir de nivel.
- **Este mes:** cobros.
- **Para mirar:** feedbacks y el resto de las alumnas.
- Un bloque nuevo va en la sección de cuándo hay que hacerlo.
- Arriba, una línea con los números del resumen del domingo ("17 activas · 10 entrenaron esta semana · 5 para atender"). Reemplaza las seis cajas, que repetían números y daban "Al día" y "Retención" calculados distinto.
- Las listas largas muestran 5 y "Ver N más" (`_corta`). Todo lo que se despliega se vuelve a plegar (`verLista`), y al plegar desde abajo la tarjeta vuelve a quedar a la vista.
- "Resto de tus alumnas" va plegado, con las de 4 a 6 días sin entrenar a la vista.
- Feedbacks: los de los últimos 7 días. Los "Bien" sin comentario van en una línea, y los reportes repetidos del mismo ejercicio en 10 minutos, en una fila ("3 veces").
- Cobros: "Marcar pagado" (hasta ese día decía "✓ Ya pagó" en verde, y la lista de las que no pagaron parecía la de las que sí), con lo cobrado del período y cuánto falta. Ya no compara con el mes anterior: comparaba medio mes con uno entero y marcaba baja todos los meses. Amira anota todos los pagos, aunque a veces se olvida.

### Mediciones
- **La alumna `id = 3` es la cuenta con la que entrena Amira.** Figura como activa; para métricas de alumnas, excluirla. Desde el 21/10/2026 el Inicio y el resumen del domingo no la cuentan (`CUENTA_DE_AMIRA` en el panel y en `weekly-summary`): solo aparece en Ciclos por renovar y en Listas para subir de nivel, porque entrena con ella.
- **Días planificados sin empezar** (punto de partida de la sesión corta, 13/10/2026): en las semanas que la alumna ya dejó atrás (marcó algo en una semana posterior) y que se cerraron en los últimos 28 días, 62 de 154 días (40%) no tenían ningún ejercicio marcado; 15 a medias y 77 completos. En todo el historial, 38%. Se mide con las tablas `rutinas` y `progreso`: cada día de rutina con ejercicios de una semana cerrada cuenta como planificado, y "cerrada" es la fecha de la primera marca en una semana posterior. Repetir a las 4 semanas del cambio con el mismo criterio.
- **Arranque** (punto de partida, 13/10/2026): de 35 alumnas, 6 nunca marcaron un ejercicio (1 sigue activa). De las 29 que arrancaron, la mitad marcó el primero antes de los 2 días del alta, 18 dentro de los 3 días y 7 después de una semana. Entran 4 o 5 alumnas por mes. Se mide con `alumnas.created_at` y la primera fila de `progreso` con `hecho`.
- **Constancia** (punto de partida, 13/10/2026): con la cuenta de "Constancia" hecha en SQL sobre `progreso`, `rutinas` y las sesiones cortas de `feedbacks`, en septiembre habrían llegado a la meta 9 de las 16 alumnas activas que ya entrenaban.

### Visitas a la web y de dónde vienen las alumnas (19/10/2026)
- **WhatsApp, no el formulario.** Los botones de la web llevan a WhatsApp, no al formulario: desde agosto nadie se anotó por ahí.
  - Por eso cada clic a WhatsApp se anota en `page_views`, con el origen con el que la persona entró al sitio: `/wa` en la principal, `/registro/wa` y `/bio/wa`.
  - Análisis muestra cuántas personas lo tocaron y de dónde venían. Antes solo lo veía Analytics (`click_whatsapp`).
- **Quién cuenta** (`afCuenta`, repetida en `index.html`, `registro` y `bio`):
  - una visita cuenta después de 3 segundos a la vista, y una vez por día por navegador;
  - no cuentan los robots (`navigator.webdriver`, o "bot", "headless", etc. en el navegador), ni un navegador con la sesión de Amira o de una alumna.
  - En Analytics, más de la mitad de las visitas de septiembre y octubre venían de centros de datos.
- **Visitas viejas sin origen:** las anotadas antes del 12/10 no lo traen, y el panel lo saca del sitio del que venían (`referrer`).
- **"¿Cómo llegó?"** (`alumnas.origen`): Instagram, WhatsApp, Recomendación, Google, Web u Otro.
  - Amira lo anota en el alta o en la ficha. Al aprobar una inscripción se precarga con lo que anotó la web.
  - Análisis muestra de dónde vinieron las alumnas de los últimos 90 días.
  - De agosto a octubre llegaron por Instagram y una por WhatsApp; ninguna por Google Ads.
- **Resultados comunes de Google (SEO, 26/10/2026):** la búsqueda a la que apunta la landing es "entrenadora personal online para mujeres".
  - Está en el título, la descripción y el `h1`. La línea verde de arriba del título grande es parte del `h1` (`.hero-badge`).
  - El precio sigue en el título, porque es lo que hace elegir un resultado entre otros.
  - Datos estructurados: `ProfessionalService`, `WebSite` (el nombre del sitio que Google muestra) y `FAQPage`. Las preguntas del `FAQPage` tienen que ser las mismas que las de la página.
  - La foto de arriba va en WebP (`foto-amira.webp`, 80 KB contra 166 KB), con el JPG para navegadores viejos y para compartir.
  - El dominio propio es del 6/10. Lo que más pesa ahora está fuera de la web: Search Console, enlaces desde otros sitios y tiempo.
  - Search Console está configurado (propiedad `https://amirafitness.com.ar/`, sitemap enviado). Su "Rendimiento" dice con qué búsquedas aparece la web y en qué posición.
- **Notas (`/notas/`, 26/10/2026):** artículos que responden lo que se busca en Google y llevan a WhatsApp.
  - Primeras tres: "Rutina para empezar en el gimnasio", "Ejercicios en casa con mancuernas" y "¿Cuántos días por semana hay que entrenar?". Están escritas en la voz de Amira, así que ella tiene que leerlas y aprobarlas.
  - Cada nota es una carpeta con su `index.html`, y comparten `notas/notas.css` y `notas/notas.js`.
  - `notas.js` cuenta la visita (`/notas/<nota>`) y el clic a WhatsApp (`/notas/wa`) en `page_views`, como la página principal. Usa la misma clave diaria `visita`, así cada persona cuenta una vez por día, en la página por la que entró. Carga Analytics, Clarity y el Pixel.
  - Análisis muestra "Entraron por las notas" y cuántas escribieron desde ahí.
  - Una nota nueva se suma a `sitemap.xml`, a `notas/index.html`, al "Seguí leyendo" de las otras, al pie de la página principal y a `notaNombre` en el panel.
- **Google Ads:**
  - Hasta el 28/9 los anuncios también salían en sitios de juegos y horóscopos (red de Display).
  - Del 13/10 al 26/10 no se mostraron. No hubo cambios en la cuenta: estaban todos "Apto" y Google decía "No sabemos la razón". El 26/10 se habilitaron las palabras clave de quien busca una entrenadora ("entrenadora personal para mujeres", "plan de entrenamiento personalizado", etc.) y se sumó un anuncio nuevo.
  - En una compu con bloqueador de publicidad (o en la red de una empresa), la lista de anuncios y las vistas previas de Google Ads aparecen en blanco: mirarlas en incógnito o en el celular.
  - El 19/10 Aaron pasó las palabras clave a concordancia de frase, agregó negativas e importó `click_whatsapp` y `registro_completado` de Analytics como conversiones.

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

**Plantillas de WhatsApp en la base (13/10/2026):** Amira usa el panel en el celular y en la compu, y cada dispositivo guardaba sus textos en `localStorage`. Ahora viven en `plantillas_mensajes` y `localStorage` queda como copia (`cargarTplsDeBase`, `guardarTplsEnBase`).
- La primera vez que cada dispositivo abre el panel, suma a la base los textos que tenía editados.
- Si al guardar no hay conexión, queda pendiente (`af-tpls-pend-…`) y se sube al volver a abrir el panel.

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
- **Cerrada el 12/10/2026:** `registros` (Amira todo; sin sesión solo se puede insertar una fila de tipo `registro` o `ficha_salud` con estado `pendiente`, sin leer, modificar ni borrar). Hasta el 14/10/2026 también entraba como `aprobado`: cualquiera con el link le cargaba una ficha aprobada a otra alumna. La ficha de una alumna existente la aprueba Amira desde Registros (`migrations/ficha_sin_edad_y_pendiente.sql`). El formulario y la ficha insertan con `sbInsertSinRespuesta` (`return=minimal`): pedir la fila de vuelta exige permiso de lectura y el insert fallaría. Ver `migrations/rls_registros_permisos.sql` y su marcha atrás.
- **Cerradas el 12/10/2026:** `rutinas` (Amira todo; cada alumna solo lee las suyas) y `progreso` (Amira todo; cada alumna lee y guarda lo suyo, incluido el upsert sobre `progreso_unique`). Ninguna página previa al ingreso las usa, el generador de rutinas usa la clave de servicio, y el service worker no escribe: le avisa a la app abierta que sincronice. Ver `migrations/rls_rutinas_progreso_permisos.sql` y su marcha atrás.
- **Cerradas el 13/10/2026:** `peso_alumna` y `push_subscriptions` (Amira todo; cada alumna lo suyo), `feedbacks` (Amira todo; cada alumna lee y crea los suyos, sin editar ni borrar), `avisos` (Amira todo; cada alumna lee los de `para = 'todas'` y los de su slug), `plantillas`, `pesos` y `fichas_salud` (solo Amira; las dos últimas están vacías y sin uso) y la lectura de `page_views` (solo Amira). Hasta ese día cualquier cuenta con sesión, no solo las alumnas, leía todos los reportes y publicaba avisos. Ver `migrations/rls_ultimas_tablas_permisos.sql` y su marcha atrás.
- **Creada el 13/10/2026, con RLS:** `plantillas_mensajes` (solo Amira). Ver `migrations/plantillas_mensajes.sql`.
- **Creada el 14/10/2026, con RLS:** `alumnas_privado` (solo Amira), con las notas privadas y el historial de pausas y bajas. Ver `migrations/alumnas_privado.sql` y su marcha atrás.
  - Hasta ese día estaban en `alumnas`. Como cada alumna lee su fila, 3 podían ver las notas privadas que Amira escribió sobre ellas y 19 su historial, con el motivo.
  - El panel los pega a cada alumna al cargar (`a.notas_privadas`, `a.estado_log`) y los guarda con `guardarPrivado`. Si no los pudo leer, no escribe, para no pisar el historial.
  - Las columnas viejas de `alumnas` quedan vacías. El trigger `alumnas_sin_privado` pasa a la tabla nueva lo que escriba ahí un panel abierto desde antes, sumando entradas sin perder ninguna.
  - Algo que la alumna no deba ver no va en `alumnas`.
  - `notas` (💬) sí lo ve: la app lo muestra.
- **Abiertas a propósito:** leer `ejercicios_biblioteca` (sin datos personales; la app la usa), insertar en `page_views` (las visitas de la landing, la bio y el formulario, que mandan `return=minimal`) e insertar inscripciones en `registros`.
- **Cada alumna solo puede cambiar de su fila de `alumnas` `last_active_at`, `foto` y `dias_disponibles`**: lo frena el trigger `alumnas_limitar_cambios`, que no aplica a Amira, a las Edge Functions ni a las funciones `security definer`. Si la app tiene que cambiar otra columna, agregarla ahí.
- **`ingresos_alumnas()`** (`security definer`, 13/10/2026): devuelve id de alumna y fecha de su último ingreso solo a Amira; otra cuenta recibe cero filas y sin sesión no se puede llamar. Ver `migrations/ingresos_alumnas.sql`.
- **Activar notificaciones pasa por `guardar_suscripcion(alumna_id, endpoint, p256dh, auth)`** (`security definer`, solo con sesión): un celular tiene una sola suscripción, y si ya era de otra alumna se la pasa a quien la activa.
- **Lo previo al ingreso pasa por funciones `security definer`** que devuelven lo justo: `alumna_registrada(email)` (sí/no, al crear el PIN), `ficha_alumna(slug)` y `ficha_guardar(slug, lesiones, tel)` (ficha de salud). Nunca exponer `nacimiento`: es el PIN de ingreso.
  - Desde el 14/10/2026 `ficha_alumna` ya no da la edad: la columna sigue y viene vacía. Con la edad, el PIN quedaba en unas 730 combinaciones.
  - `ficha_guardar` ya no cambia un teléfono cargado; solo completa uno vacío.
- **Antes de abrir o crear una tabla**, revisar también qué puede hacer cualquier cuenta con sesión: crear una cuenta es libre, así que `to authenticated using (true)` deja pasar a cualquiera, no solo a las alumnas.
- Cada tabla nueva tiene que nacer con RLS activado y sin políticas `USING (true)`.
- Los emails de `alumnas` se guardan en minúscula: el de ingreso siempre llega en minúscula.

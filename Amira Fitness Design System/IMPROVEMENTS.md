# Cómo profesionalizar Amira Fitness — Análisis y propuesta

Un análisis de **10 cambios concretos por superficie** para que la app del panel y la de la alumna se vean como un producto pulido, no como un side-project.

---

## 📌 Estado de aplicación (mayo 2026)

Los siguientes cambios YA fueron aplicados a `alumna/index.html` y `panel/index.html` en este proyecto:

**Alumna**
- ✅ #3 Progress bar más rica (26px de alto, "5/8" adentro, "62%" tenue)
- ✅ #6 Day tabs sin verde inundado (tabs flat con banda inferior verde)
- ✅ #7 Timer flotante como FAB circular bottom-right (76px, con × overlay para skip)

**Panel**
- ✅ #3 Sidebar barra lateral activa (3px verde a la izquierda + texto negro 500)
- ✅ #4 Section headers refinadas (10px, tracking reducido, divisor arriba)
- ✅ #5 Search bar en lista alumnas (filtra por nombre)
- ✅ #6 Drawer overflow menu ("⋯" con Copiar link / WhatsApp / Informe / Pausar / Eliminar)
- ✅ #9 "Conectado · Supabase" → "Sincronizado" (oculto cuando todo OK)
- ✅ D Espaciado vertical del main (2rem → 2.5rem arriba / 3rem abajo)

**Pendientes (caveats)**
- ⏸ Alumna #9 (Perfil con stats): la app no tiene tab "Perfil", así que no aplica
- ⏸ Panel #7 (Métricas con sparkline + delta): requiere infraestructura de datos históricos que hoy no existe — postponer hasta que se loguee semanal/mensualmente
- ⏸ Panel #8 (Routine builder agrupado por zona): requiere refactor del editor de rutinas que es muy invasivo — postergar
- ⏸ Iconos Lucide en sidebar/bottom-nav: en producción siguen los emoji. Aplicarlo en bloque cuando arranque sprint de iconografía


La regla principal: **el producto actual está sólido en marca y voz** (verde + crema + DM Serif Display + voseo) — todo eso es excelente y hay que conservarlo. Los problemas son de **densidad visual, iconografía y consistencia de estados**.

> 👉 **Mockups visuales:** abrí `improvements/index.html` para ver el antes/después de cada componente lado a lado.

---

## El diagnóstico de un párrafo

Lo que hoy hace que la app "se vea hecha en casa" es, principalmente, **la mezcla de emoji con UI seria**. Emoji al lado de un botón verde primario lee como "chat de WhatsApp"; lee bien para la voz de marca (que es informal y personal) pero mata la sensación de "esta es una app real que cuesta dinero todos los meses". Las apps de fitness profesionales (Strong, Strava, Fitbod, Hevy, Future) usan **iconos lineales** y reservan emoji para **momentos celebratorios** específicos. Eso es lo que tenemos que hacer.

El segundo problema es que **todo en el home compite por la atención**: hero + warmup + selector de semana + selector de día + progress bar + título "Ejercicios del día" + 8 ejercicios. Hay que reducir.

---

## 🏋️ APP DE LA ALUMNA — 10 cambios

### 1. Reemplazar emoji por iconos lineales (Lucide)
**Donde:** bottom nav (🏋️📈💬👤), warmup card (▶), header (🌙), service cards del marketing (📋📊💬).
**Por qué:** los emoji renderean diferente en cada SO (Apple es coloridos, Android plano, Windows con outline). Esa inconsistencia es la marca registrada del "producto amateur". Iconos lineales unificados leen como una app profesional.
**Conservar:** emoji en momentos celebratorios (🎉 al completar el día), en los recordatorios de WhatsApp (💪 🌟 💚), y en los pillars de la sección filosofía (allí los emoji se sienten parte del tono, no parte de la UI).

### 2. Reducir el "hero card" a la mitad
**Hoy:** card con avatar circular "M" + "¡Hola María!" + nota de Amira ("Cualquier molestia, avisame..."). Ocupa 80px de altura para repetir info que ya está en el header.
**Mejor:** sacar el hero entero del home. El header ya dice "María · Día 2". La nota de Amira movela a una pequeña tarjeta amber **debajo** de la lista de ejercicios o como tooltip del primer ejercicio. El home empieza directamente con el selector de día + barra de progreso.

### 3. Progress bar más rica — número adentro, no arriba
**Hoy:** "5 de 8 ejercicios" arriba, barra abajo, "62%" a la derecha. Tres elementos para una idea.
**Mejor:** una barra más alta (12px) con el número "5/8" centrado adentro en blanco. Mucho más legible de un vistazo durante el entreno.

### 4. Exercise card — densidad y jerarquía
**Hoy:** nombre, "3 series · 20-30\"", botón Tip, botón Video, input de kg, botón "Marcar como hecho" full-width. Cinco controles para un ejercicio.
**Mejor:**
- **Tap en la card entera** marca como hecho (estado primario)
- **Tip y Video** se vuelven iconos pequeños (💡 → Lucide `lightbulb`, ▶ → Lucide `play`) en la esquina superior derecha
- **El input de peso** queda inline, siempre visible a la derecha del nombre, sin label "kg" (placeholder lo dice)
- **Series · reps** se vuelve un chip pequeño debajo del nombre, no un texto suelto

### 5. Done state — menos saturado
**Hoy:** card hecha = fondo `var(--vl)` (verde claro). En una lista de 8 ejercicios, completar 6 baña la pantalla de verde.
**Mejor:** card hecha = fondo blanco igual, pero el número del ejercicio se vuelve verde sólido con check, el nombre del ejercicio se tacha sutilmente (`text-decoration: line-through; opacity: 0.55;`), y aparece un chip pequeño "Hecho" verde a la derecha. Mucho más adulto.

### 6. Day tabs — quitar el verde inundado del activo
**Hoy:** los tabs Día 1 / Día 2 / Día 3 son píldoras grandes y el activo es verde sólido con texto blanco.
**Mejor:** mantener píldora, pero el activo es **texto verde sobre fondo verde claro `var(--vl)`** con una banda inferior verde sólida de 2px. Conserva la legibilidad y deja de competir con los CTAs verdes.

### 7. Timer flotante — más chico, no full-width
**Hoy:** una barra gigante encima del bottom nav con círculo grande (54px), título "Descansando…", subtítulo, botón "Saltar".
**Mejor:** un **botón flotante circular de 68px** abajo a la derecha (FAB pattern), con el número de segundos y un anillo de progreso animado alrededor. Tap = pausar/reanudar, long-press = elegir tiempo, swipe up = cerrar. Ocupa el mínimo y se siente moderno.

### 8. Notas screen → chat real
**Hoy:** lista plana donde Amira y la alumna se alternan, todas las cards iguales.
**Mejor:** **layout tipo chat** — mensajes de Amira a la izquierda con su mini-avatar circular, mensajes de la alumna a la derecha en un bubble verde claro alineado a la derecha. Es exactamente lo que la usuaria espera porque está acostumbrada a WhatsApp.

### 9. Profile — más que "tu perfil"
**Hoy:** avatar grande "M" + nombre + tabla de datos (tipo de entrenamiento, días, ciclo). Plana.
**Mejor:** una sección "Tu progreso" arriba con las stats más motivadoras (días entrenados, ciclos completados, racha actual) en cards grandes con números DM Serif, **antes** de los datos administrativos. Y un botón visible para "Compartir con Amira" o "Reportar problema" al final.

### 10. Loading + empty states explícitos
**Hoy:** "loading" y "no hay ejercicios" muestran texto chico centrado en gris. Funcional pero pobre.
**Mejor:** **empty states con micro-ilustración** (un iconito Lucide grande tenue + texto + opcional CTA). Para "No tenés ejercicios hoy", mostrar: ícono de calendario tenue, "Día de descanso 💪", "Aprovechá para hidratarte y dormir bien", y un botón secundario "Ver rutina de la semana".

---

## 🖥️ PANEL DE AMIRA — 10 cambios

### 1. Sidebar icons → Lucide, ya
**Hoy:** 🏠 👥 📋 📚 📝 💬 ⚙️ — emoji puro. Esto es **lo primero** que delata que el panel no es producto pago.
**Mejor:** `home`, `users`, `clipboard-list`, `library`, `inbox`, `message-circle`, `settings` de Lucide. Stroke 1.5–2px, 16px de tamaño. Color toma del estado de la nav.

### 2. Login real — email + password + remember me
**Hoy:** una sola input de "contraseña". Lee como demo.
**Mejor:** dos campos (email + password) + checkbox "Recordarme" + link "¿Olvidaste tu contraseña?". Aunque el backend siga aceptando un solo password compartido, la UI tiene que parecer un login normal. Bonus: agregar la foto de Amira pequeña a la izquierda del título "Hola, Amira" para personalizar.

### 3. Active state del sidebar — barra lateral, no pintón
**Hoy:** item activo = todo el fondo verde claro.
**Mejor:** item activo = **barra verde sólida de 3px a la izquierda** + texto en negro normal con peso 500. Más sutil, más adulto. Es el patrón Linear / Vercel / Notion.

### 4. Section headers del sidebar
**Hoy:** "PRINCIPAL" / "GESTIÓN" en mayúsculas con tracking grande, gris claro.
**Mejor:** Quedan en uppercase pero **más pequeñas** (9px → 10px), gris medio (no gris claro), con menos tracking (1.5px → 0.8px), y con un divisor sutil arriba (no abajo).

### 5. Lista de alumnas — agregar search + "última actividad"
**Hoy:** lista plana sin búsqueda, sin metadata temporal.
**Mejor:** **search bar arriba** ("Buscar alumna...") con icono Lucide `search` a la izquierda. En cada fila, agregar columna "Última actividad" a la derecha del estado: "hace 2h" / "ayer" / "hace 4 días" (rojo si > 7 días). Esto es lo que Amira **realmente necesita** para saber a quién hacerle follow-up.

### 6. Drawer header con overflow menu
**Hoy:** avatar + nombre + tipo, botón X de cerrar.
**Mejor:** mismo header + **botón "..." (Lucide `more-horizontal`)** que abre un menú con: Editar, Archivar, Eliminar, Enviar WhatsApp, Copiar link. Reduce la fricción para acciones secundarias.

### 7. Métricas del dashboard con trend
**Hoy:** "Alumnas activas · 12" en DM Serif gigante. Lindo pero estático.
**Mejor:** mismo número pero con **delta + flecha** debajo en chico ("↑ 2 esta semana" en verde) y una **sparkline tenue** atrás del número (8 semanas). El número sigue siendo el héroe pero ahora hay contexto.

### 8. Routine builder — agrupación por zona
**Hoy:** lista plana de 8 ejercicios con grupo como pequeño chip ("Abdomen" / "Tren inferior").
**Mejor:** **agrupados por sección colapsable**: "Abdomen (3)", "Tren inferior (3)", "Hombros (2)", cada grupo expandible/colapsable con su lista de ejercicios. Más rápido para escanear, más fácil para mover bloques completos.

### 9. Connection status footer — sacarlo
**Hoy:** "Conectado · Supabase" + "v1.4.0" en el footer del sidebar. Esto **lea implementation details** — Amira no necesita saber qué base de datos usa.
**Mejor:** sacar la mención a Supabase. Dejar solo un pequeño dot verde + "Sincronizado" (o invisible si todo OK; visible solo si hay error). La versión movela al menú de configuración.

### 10. Empty states + bulk actions
**Hoy:** lista vacía = nada. No hay forma de hacer acciones en bulk.
**Mejor:**
- **Empty state**: ícono grande tenue + "Todavía no tenés alumnas en esta categoría" + CTA primario ("Nueva alumna").
- **Selección múltiple**: checkbox a la izquierda de cada fila (revealed on hover), toolbar arriba que aparece con "3 seleccionadas · Enviar mensaje · Pausar · Eliminar".

---

## Cambios cross-cutting (afectan ambas superficies)

### A. Sistema de iconos Lucide oficial
Cargar Lucide via CDN una sola vez. Documentar en `colors_and_type.css` un **mapeo emoji → Lucide** para los casos donde emoji se queda (celebraciones, mensajes) vs donde se reemplaza (UI). Ver el set canónico abajo.

### B. Hover + press states en TODOS los botones tappables
Hoy hay states inconsistentes. Regla simple:
- **Botones primarios verdes:** hover = darker green + `translateY(-1px)`, press = no transform, color un toque más oscuro.
- **Cards tappables:** hover = `box-shadow: 0 4px 20px rgba(0,0,0,.06)` + borde más oscuro, press = `transform: scale(0.99)`.
- **List rows:** hover = `background: var(--s2)`, press = `background: var(--vl)` brevemente.

### C. Tipografía — usar peso 600 estratégicamente
DM Sans soporta 600 pero hoy solo se usa 300/400/500. Reservar **600** para: títulos de cards en el panel, nombre de alumna en el drawer, nombre de ejercicio cuando el peso ya fue logueado. Pequeño cambio, gran efecto de jerarquía.

### D. Espaciado vertical — más aire arriba/abajo de bloques
Las sections del marketing tienen `5rem` de padding vertical (excelente). Las pantallas del panel tienen `2rem` — se siente apretado. Subir a `2.5–3rem` y el panel se siente premium sin agregar elementos.

### E. Avatar de Amira en lugar de "A" letra cuando sea ella
En notas/mensajes/drawer, cuando habla Amira, usar **su foto chiquita** (24×24) en lugar de la letra "A". Más personal — refuerza la promesa de marca "soy yo, no un bot".

---

## Set canónico de Lucide icons a adoptar

| Donde se usa | Emoji actual | Lucide propuesto |
|---|---|---|
| Bottom nav · Rutina | 🏋️ | `dumbbell` |
| Bottom nav · Progreso | 📈 | `trending-up` |
| Bottom nav · Notas | 💬 | `message-square` |
| Bottom nav · Perfil | 👤 | `user-round` |
| Header · Theme toggle | 🌙 / ☀️ | `moon` / `sun` |
| Warmup card · Play | ▶ | `play` |
| Service · Rutina | 📋 | `clipboard-list` |
| Service · Tracking | 📊 | `line-chart` |
| Service · Contacto | 💬 | `message-circle` |
| Sidebar · Inicio | 🏠 | `home` |
| Sidebar · Alumnas | 👥 | `users` |
| Sidebar · Rutinas | 📋 | `clipboard-list` |
| Sidebar · Biblioteca | 📚 | `library` |
| Sidebar · Registros | 📝 | `inbox` |
| Sidebar · Mensajes | 💬 | `message-circle` |
| Sidebar · Configuración | ⚙️ | `settings` |
| Exercise card · Tip | 💡 | `lightbulb` |
| Exercise card · Video | ▶ | `play-circle` |
| Drawer · Cerrar | ✕ | `x` |
| Drawer · Más acciones | — | `more-horizontal` |
| Search | — | `search` |

**Lo que se queda como emoji** (porque la voz lo pide):
- Celebración al completar el día (🎉)
- Mensajes de WhatsApp (💪 🌟 💚)
- Pillars de la filosofía (🎯 🔄 💬)
- Notas escritas por Amira que incluyen emoji

---

## Priorización — qué hacer primero si solo tenés un fin de semana

**Sprint 1 — alto impacto, bajo esfuerzo:**
1. Reemplazar emoji por Lucide en sidebar del panel + bottom nav alumna (cambio #1 de cada lado)
2. Sacar "Conectado · Supabase" del sidebar (panel #9)
3. Tab activo del sidebar → barra lateral (panel #3)

**Sprint 2 — alto impacto, esfuerzo medio:**
4. Reducir hero card del alumna home (alumna #2)
5. Done state menos saturado (alumna #5)
6. Search bar + "última actividad" en lista alumnas (panel #5)
7. Drawer overflow menu (panel #6)

**Sprint 3 — pulido final:**
8. Exercise card densidad (alumna #4)
9. Notas → chat (alumna #8)
10. Métricas con trend + sparkline (panel #7)

Con esos 10 cambios la app pasa de "side-project con buen criterio" a "producto pago con buen criterio".

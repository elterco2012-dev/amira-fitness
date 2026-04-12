# Amira Fitness v3 — Versión completa

## Novedades en esta versión

✅ **Contraseña en el panel** — nadie entra sin la clave (por defecto: `amira2025`)
✅ **Modo oscuro** — botón en el panel y en la app de la alumna
✅ **Temporizador de descanso** — arranca automático cuando la alumna tilda un ejercicio
✅ **Confetti + vibración** — al completar todos los ejercicios del día
✅ **Peso usado por ejercicio** — la alumna registra cuánto peso usó en cada ejercicio
✅ **Historial de progreso** — gráfico de evolución de pesos semana a semana
✅ **Comentarios con notificación WhatsApp** — Amira recibe un mensaje al instante
✅ **Supabase listo** — solo hay que pegar las credenciales en Configuración

---

## Cómo subir a Vercel

1. Entrá a https://vercel.com → crear cuenta con Google (gratis)
2. "Add New Project" → seleccioná la carpeta `amira-v3`
3. Deploy → en 30 segundos está publicado

---

## Configuración inicial (una sola vez)

### 1. Cambiar la contraseña del panel
- Entrá al panel con la contraseña `amira2025`
- Ir a **Configuración** → cambiar contraseña

### 2. Configurar número de WhatsApp para notificaciones
- Panel → **Configuración** → "Tu número de WhatsApp"
- Ingresar el número con código de país sin el +
- Ej: para Argentina → `5491123456789`
- Cuando una alumna deje un comentario, se abre WhatsApp con el mensaje listo

### 3. Conectar Supabase (para sincronización entre dispositivos)
Una vez que tenés las credenciales de Supabase:
- Panel → **Configuración** → pegar el Project URL y la Anon key
- Guardar → listo, los datos se sincronizan en la nube

---

## Cómo funciona el historial de pesos

La alumna carga el peso que usó en cada ejercicio desde su app.
Amira lo ve en el panel → sección **Historial** → selecciona la alumna y el ejercicio → ve el gráfico de evolución semana a semana.

---

## Links de alumnas

| Alumna | Link |
|--------|------|
| María  | `https://tu-app.vercel.app/alumna/maria` |

Copiá los links desde el panel → **Links**.

---

## Dominio propio (opcional, ~$15 USD/año)

1. Comprar dominio en https://namecheap.com
2. Vercel → Settings → Domains → agregar
3. Seguir instrucciones (5 min)

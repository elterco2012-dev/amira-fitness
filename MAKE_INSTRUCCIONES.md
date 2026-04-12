# Make.com — Automatización de recordatorios y resúmenes semanales

## Qué va a hacer Make

| Automatización | Cuándo | Qué hace |
|---|---|---|
| Recordatorio de entrenamiento | Lunes, miércoles y viernes a las 9am | Manda WhatsApp a cada alumna que tiene que entrenar |
| Resumen semanal | Domingo a las 10am | WhatsApp personalizado a cada alumna con su progreso |
| Resumen para Amira | Domingo a las 11am | Resumen de todas las alumnas en un solo mensaje |
| Notificación de registro | Al instante | Cuando alguien se registra, avisa a Amira |

---

## Paso 1 — Crear cuenta en Make

1. Ir a https://make.com
2. Crear cuenta gratis (1,000 operaciones/mes gratuitas — alcanza para esto)
3. Confirmar el mail

---

## Paso 2 — Conectar WhatsApp Business

Make se conecta a WhatsApp a través de **CallMeBot** (gratis, sin tarjeta).

### Configurar CallMeBot (5 minutos):
1. Desde el celu de Amira, mandar un WhatsApp a **+34 644 59 45 95**
2. Escribir exactamente: `I allow callmebot to send me messages`
3. En unos minutos te manda de vuelta una API key (algo como `123456`)
4. Guardar esa API key — la vas a usar en Make

Para enviar mensajes a las alumnas también necesitás que cada alumna haga lo mismo (mandar ese mensaje al número de CallMeBot).

**Alternativa más profesional:** Usar **Twilio** (tiene plan gratuito con $15 de crédito) que permite mandar WhatsApp sin que las alumnas tengan que hacer nada previo.

---

## Paso 3 — Crear el Escenario de recordatorio diario

1. En Make → **Create a new scenario**
2. Agregar el trigger: buscar **"Schedule"** → elegir **"Every day"**
3. Configurar: días = Lunes, Miércoles, Viernes · hora = 09:00 · timezone = America/Buenos_Aires

4. Agregar módulo: buscar **"HTTP"** → **"Make a request"**
   - URL: `https://aywkeoxwybzcexaichtv.supabase.co/rest/v1/alumnas?select=*`
   - Method: GET
   - Headers:
     - `apikey`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (tu anon key completa)
     - `Authorization`: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

5. Agregar módulo: **"Iterator"** — para recorrer cada alumna del resultado

6. Agregar módulo: **"HTTP"** → **"Make a request"** (para enviar WhatsApp via CallMeBot)
   - URL: `https://api.callmebot.com/whatsapp.php`
   - Method: GET
   - Query params:
     - `phone`: `{{item.tel}}` (el número de la alumna)
     - `text`: `Hola {{item.nombre}}! 💪 Hoy es día de entrenamiento. Tu rutina: https://amira-fitness.vercel.app/alumna/{{item.slug}} ¡Vamos que podés! — Amira`
     - `apikey`: (tu API key de CallMeBot)

7. Agregar filtro entre el Iterator y el HTTP: `tel` no está vacío

8. **Save** y **Run once** para testear

---

## Paso 4 — Resumen semanal automático (domingos)

Mismo proceso pero:
- Schedule: cada domingo a las 10:00
- Para el mensaje, también traer los comentarios de esa alumna:

Segundo HTTP module a Supabase:
- URL: `https://aywkeoxwybzcexaichtv.supabase.co/rest/v1/comentarios?alumna_id=eq.{{item.id}}&order=created_at.desc&limit=5`
- Mismo header de autorización

Mensaje del resumen:
```
¡Hola {{item.nombre}}! 🌟 Resumen de tu semana en Amira Fitness:

💪 Seguís progresando con tu plan personalizado
📋 Tu rutina actualizada: https://amira-fitness.vercel.app/alumna/{{item.slug}}

¡Seguís creciendo! — Amira 💚
```

---

## Paso 5 — Notificación instantánea de registro nuevo

1. Nuevo escenario en Make
2. Trigger: **"Supabase"** → **"Watch Rows"**
   - Connection: crear nueva con tu URL y anon key
   - Table: `registros`
   - Filter: `estado = pendiente`

3. Módulo HTTP a CallMeBot con mensaje para Amira:
```
🆕 Nueva alumna en Amira Fitness!

👤 {{item.nombre}}
📱 {{item.tel}}
🎯 Objetivos: {{item.objetivos}}
📍 {{item.ubicacion}}

Aprobá en el panel: https://amira-fitness.vercel.app/panel
```

---

## Costos

| Servicio | Plan | Costo |
|---|---|---|
| Make.com | Free | $0/mes |
| CallMeBot | Free | $0/mes |
| Supabase | Free | $0/mes |
| Vercel | Hobby (free) | $0/mes |
| **Total** | | **$0/mes** |

Si el volumen crece (más de 10 alumnas enviando muchos mensajes):
- Make Pro: $9 USD/mes
- Twilio WhatsApp: ~$0.005 por mensaje (muy barato)

---

## Tips importantes

1. **Las alumnas deben tener el número cargado** en el panel — sin eso Make no puede enviarles nada
2. **Testear primero** con Run Once antes de activar el schedule
3. **CallMeBot necesita** que cada alumna mande el mensaje de autorización una vez
4. Si querés **Twilio** en vez de CallMeBot (más profesional, sin que las alumnas hagan nada), avisanos y lo configuramos

---

## Alternativa más simple: Zapier

Si Make te parece complejo, Zapier tiene la misma funcionalidad con una interfaz más simple. Plan gratuito: 100 tareas/mes.

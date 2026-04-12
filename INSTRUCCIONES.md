# Amira Fitness v4 — Versión completa con onboarding y landing

## Qué hay en esta versión

```
amira-v4/
├── index.html          → Landing page profesional
├── registro/           → Formulario de registro para nuevas alumnas
├── panel/              → Panel de Amira (privado con contraseña)
├── alumna/             → App de cada alumna
├── api/data.json       → Datos de rutinas
└── vercel.json         → Configuración de rutas
```

## Novedades en v4

✅ **Landing page** — página de presentación con servicios, testimonios y CTA
✅ **Formulario de registro** — wizard de 4 pasos para nuevas alumnas
✅ **Bandeja de registros** — Amira ve los registros nuevos en el panel y aprueba/rechaza
✅ **Onboarding automático** — al aprobar, el perfil de la alumna se pre-carga solo
✅ **Notificación WhatsApp** — al registrarse, le llega a Amira un WhatsApp con todos los datos
✅ **Recordatorios** — Amira envía recordatorios de entrenamiento con un clic
✅ **Resúmenes semanales** — mensaje personalizado para cada alumna o para todas juntas

## Flujo completo de una alumna nueva

1. Ve el link `/registro` en Instagram o WhatsApp de Amira
2. Completa el formulario (2 minutos)
3. Amira recibe un WhatsApp con todos los datos
4. Amira entra al panel → Registros → Aprueba
5. El perfil se crea automáticamente con los datos del formulario
6. Amira asigna la rutina y copia el link
7. Le manda el link por WhatsApp a la alumna

## Cómo subir a Vercel

1. vercel.com → crear cuenta con Google (gratis)
2. Add New Project → seleccionar carpeta `amira-v4`
3. Deploy → listo en 30 segundos

## Configuración inicial

### Contraseña del panel
- Entrar con `amira2025`
- Panel → Configuración → cambiar contraseña

### WhatsApp para notificaciones
- Panel → Configuración → número de WhatsApp
- Formato: código de país + número, sin + ni espacios
- Argentina: `5491123456789`

### Personalizar la landing
Editar `index.html` — buscar los textos entre comillas y reemplazar:
- "Amira Fitness" → nombre real si es diferente
- Los números de estadísticas (+50 alumnas, etc.)
- Los testimonios (están marcados como genéricos)
- La foto del hero (reemplazar el emoji 🧘‍♀️ con una imagen real)

## Supabase (sincronización entre dispositivos)
Panel → Configuración → pegar Project URL y Anon key

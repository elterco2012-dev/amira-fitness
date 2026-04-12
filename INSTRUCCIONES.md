# Amira Fitness — Versión Final con Supabase

## Estructura

```
amira-final/
├── index.html              → Landing page
├── registro/index.html     → Formulario para nuevas alumnas  
├── panel/index.html        → Panel privado de Amira
├── alumna/index.html       → App de cada alumna
├── api/
│   ├── supabase.js         → Cliente Supabase (credenciales ya configuradas)
│   └── data.json           → Rutina de María de respaldo
├── SUPABASE_SQL.sql        → SQL para crear las tablas
└── vercel.json             → Configuración de rutas
```

## Paso 1 — Crear las tablas en Supabase

1. Ir a https://supabase.com → tu proyecto → **SQL Editor**
2. Hacer clic en **New query**
3. Copiar y pegar el contenido de `SUPABASE_SQL.sql`
4. Hacer clic en **Run**
5. Debería decir "Success. No rows returned"

## Paso 2 — Subir a Vercel

1. Ir a https://vercel.com → Add New Project
2. Seleccionar la carpeta `amira-final`
3. Deploy → listo en 30 segundos

La URL va a ser algo como: `https://amira-final.vercel.app`

## Paso 3 — Configuración inicial del panel

1. Entrar a `/panel` con la contraseña `amira2025`
2. Ir a **Configuración** → cambiar la contraseña
3. Cargar el número de WhatsApp para notificaciones

## Lo que funciona con Supabase activo

✅ Panel accesible desde cualquier dispositivo (celu, compu, tablet)
✅ Alumnas y rutinas guardadas en la nube permanentemente  
✅ Comentarios de las alumnas aparecen en tiempo real en el panel
✅ Registros de nuevas alumnas llegan al panel en segundos
✅ Si el celu se rompe o cambia, los datos no se pierden

## URLs importantes

| Página | URL |
|--------|-----|
| Landing | `tu-dominio.vercel.app` |
| Registro | `tu-dominio.vercel.app/registro` |
| Panel (privado) | `tu-dominio.vercel.app/panel` |
| María | `tu-dominio.vercel.app/alumna/maria` |

## Dominio propio (opcional)

1. Comprar en https://namecheap.com (~$15 USD/año)
2. Vercel → Settings → Domains → agregar
3. Seguir instrucciones de Vercel (5 min)

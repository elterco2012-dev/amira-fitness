# Amira Fitness — Instrucciones para publicar

## Qué hay en esta carpeta

```
amira-fitness/
├── index.html          → Página de inicio
├── panel/
│   └── index.html      → Panel de Amira (para vos)
├── alumna/
│   └── index.html      → App de la alumna (la que le mandás)
└── vercel.json         → Configuración de links
```

## Cómo subir a Vercel (5 minutos, gratis)

### Paso 1 — Crear cuenta en Vercel
Entrá a https://vercel.com y registrate con Google o GitHub (gratis).

### Paso 2 — Subir la carpeta
1. En el dashboard de Vercel, hacé clic en **"Add New Project"**
2. Elegí **"Browse"** y seleccioná la carpeta `amira-fitness`
3. Vercel la detecta como sitio estático automáticamente
4. Hacé clic en **"Deploy"**

En 30 segundos ya está publicado con una URL como:
`https://amira-fitness.vercel.app`

### Paso 3 — Links por alumna
Cada alumna tiene su propio link que encontrás en el panel:

| Alumna | Link |
|--------|------|
| María  | `https://amira-fitness.vercel.app/alumna/maria` |
| Laura  | `https://amira-fitness.vercel.app/alumna/laura` |
| Sol    | `https://amira-fitness.vercel.app/alumna/sol` |

Copiá el link de cada alumna desde el panel → sección "Links".

### Paso 4 — Mandarle el link por WhatsApp
Simplemente pegá el link en el chat de WhatsApp con la alumna.
Ella lo puede guardar como acceso directo en el celu.

---

## ¿Cómo actualizar una rutina?

1. Abrí `/panel` (guardá ese link solo para vos)
2. Agregá o modificá ejercicios
3. Hacé clic en "Guardar cambios"

Los cambios se guardan en el navegador de Amira. Para que las alumnas vean los cambios, necesitás **volver a subir** la carpeta a Vercel (mismo proceso, Vercel detecta los cambios solos).

> Nota: Si querés una versión con base de datos real donde los cambios se reflejan instantáneamente, avisale a tu desarrollador — se puede hacer con Supabase (también gratis).

---

## ¿Querés un dominio propio?
1. Comprá un dominio en https://namecheap.com (~$15 USD/año)
2. En Vercel → Settings → Domains → agregás el dominio
3. Seguís las instrucciones de Vercel (5 minutos)

¡Listo! La app queda en `amira-fitness.com/alumna/maria`

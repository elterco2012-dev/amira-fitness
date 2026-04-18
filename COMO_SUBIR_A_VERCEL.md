# Cómo subir correctamente a Vercel

## Estructura que debe quedar en Vercel

```
amira-fitness.vercel.app/
├── index.html          ← Landing page
├── sb.js               ← Cliente Supabase (IMPORTANTE: este es el correcto)
├── sw.js               ← Service Worker (PWA)
├── vercel.json         ← Configuración de rutas
├── api/
│   ├── sb.js           ← Cliente Supabase (copia del raíz)
│   └── seed.json       ← Datos de respaldo
├── panel/
│   └── index.html      ← Panel de Amira
├── alumna/
│   └── index.html      ← App de las alumnas
├── ficha/
│   └── index.html      ← Ficha de salud
└── registro/
    └── index.html      ← Formulario de registro
```

## Pasos para subir

### Opción A — Desde la interfaz de Vercel (recomendado)
1. Ir a vercel.com → tu proyecto amira-fitness
2. Settings → Git → si no usás Git, ir a "Deployments"
3. Hacer drag & drop de la carpeta `amira-v3` completa

### Opción B — Si usás Vercel CLI
```
npm i -g vercel
cd amira-v3
vercel --prod
```

## ⚠️ Archivos CRÍTICOS que no deben ser versiones viejas

Estos archivos tienen que ser exactamente los de este zip:
- `sb.js` — tiene el fix del error 409 (on_conflict por tabla)
- `api/sb.js` — igual que el anterior
- `alumna/index.html` — tiene fix de semanas/ciclos
- `panel/index.html` — tiene biblioteca editable y plantillas
- `ficha/index.html` — tiene la ficha por alumna (/ficha/maria)

## URLs que deberían funcionar
- /panel → Panel de Amira (contraseña: amira2025)
- /alumna/maria → App de María
- /ficha/maria → Ficha de salud de María
- /registro → Formulario de nuevas alumnas

## Número de WhatsApp de Amira
5492226500790 — está hardcodeado en todos los archivos como default.

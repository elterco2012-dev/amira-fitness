# Amira Fitness v2 — Instrucciones

## Qué hay en esta carpeta

```
amira-v2/
├── index.html           → Página de inicio
├── vercel.json          → Configuración de rutas
├── panel/
│   └── index.html       → Panel de Amira
├── alumna/
│   └── index.html       → App de cada alumna
└── api/
    └── data.json        → Rutina completa de María (con todos los videos)
```

## Novedades en esta versión

✅ Videos reales de YouTube en todos los ejercicios
✅ Foto de perfil por alumna (se sube desde el panel)
✅ Comentarios: la alumna deja notas al terminar el día y Amira las ve en el panel
✅ Progresión automática: al pasar a la semana 2, 3 o 4, los ejercicios se copian de la semana anterior. Amira solo modifica lo que cambia.
✅ Sección "Comentarios" en el panel para ver todas las notas de todas las alumnas

## Cómo subir a Vercel (5 minutos, gratis)

1. Entrá a https://vercel.com y creá una cuenta con Google (gratis)
2. En el dashboard hacé clic en "Add New Project"
3. Elegí "Browse" y seleccioná la carpeta `amira-v2`
4. Hacé clic en "Deploy"

En 30 segundos queda publicado en: `https://amira-v2.vercel.app`

## Links de alumnas

Cada alumna tiene su link único:
- María → `https://amira-v2.vercel.app/alumna/maria`

Copialo desde el panel → sección "Links" → botón "Copiar".

## Nota sobre los datos

Por ahora los datos se guardan en el navegador de Amira (localStorage).
Esto significa que si Amira accede al panel desde otro dispositivo, no verá los datos.

**Solución fácil:** Exportar e importar el archivo `data.json` desde el panel
(se puede agregar en una próxima versión).

**Solución permanente:** Conectar con Supabase (base de datos gratuita).
Avisanos y lo implementamos.

## Dominio propio (opcional)

Si Amira quiere `amira-fitness.com`:
1. Comprá el dominio en https://namecheap.com (~$15 USD/año)
2. En Vercel → Settings → Domains → agregar el dominio
3. Seguir las instrucciones (5 min)

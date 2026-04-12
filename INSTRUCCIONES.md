# Amira Fitness — Fix completo

## Qué corrige esta versión

✅ Supabase conectado de verdad — datos sincronizados entre dispositivos
✅ Rutina de María con todos los videos reales (se carga automáticamente al abrir el panel)
✅ Edición de alumnas — botón "Editar" en cada alumna para cambiar nombre, WhatsApp, tipo, días y notas
✅ Campo WhatsApp al crear nueva alumna
✅ Temporizador de descanso automático (45 seg) al tildar cada ejercicio
✅ Comentarios guardados en Supabase (visibles desde cualquier dispositivo)
✅ Notificación WhatsApp a Amira cuando una alumna deja un comentario

## Cómo deployar (reemplaza la versión anterior en Vercel)

### Opción A — Reemplazar en Vercel (recomendado)
1. Ir a vercel.com → tu proyecto `amira-fitness`
2. Settings → Git (o el panel principal)
3. Descomprimir esta carpeta en tu compu
4. Arrastrar la carpeta `amira-fix` directamente al proyecto en Vercel
5. Vercel detecta los cambios y redeploya automáticamente

### Opción B — Nuevo proyecto en Vercel
1. vercel.com → Add New Project
2. Seleccionar la carpeta `amira-fix`
3. Deploy
4. La URL nueva va a ser algo como `amira-fix.vercel.app`
5. Actualizar el dominio `amira-fitness.com` para apuntar al nuevo proyecto (Settings → Domains)

## Qué hacer después de deployar

1. Entrar al panel con `amira2025`
2. La rutina de María se carga automáticamente desde Supabase en el primer uso
3. Ir a Alumnas → buscar a María → "Editar datos" → cargar su número de WhatsApp
4. Ir a Config → cargar el número de WhatsApp de Amira para recibir notificaciones

## Nota sobre automatización

Los recordatorios automáticos (que se envíen solos sin hacer nada) requieren
un servicio externo como Make.com o un cron job. Por ahora se envían manualmente
con un clic desde el panel → Recordatorios.

Si querés automatizarlos, el próximo paso sería conectar Make.com (tiene plan gratis).

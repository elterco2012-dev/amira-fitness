# Amira Fitness PRO — Instrucciones completas

## Novedades en esta versión

✅ Login con contraseña para proteger el panel
✅ Modo oscuro (en panel y en app de alumnas)
✅ Temporizador de descanso automático — arranca al tildar cada ejercicio
✅ Registro de pesos por ejercicio — la alumna anota cuánto levantó
✅ Gráfico de progreso — el panel muestra la evolución de pesos semana a semana
✅ Confetti al completar el día 🎉
✅ Vibración del celu cuando termina el descanso
✅ Progresión automática entre semanas
✅ Supabase listo para conectar (base de datos real y gratuita)
✅ Notificaciones a Amira por WhatsApp cuando una alumna comenta

## Cómo configurar antes de publicar

### 1. Cambiar la contraseña del panel
Abrí `panel/index.html` y buscá esta línea:
```
const PASSWORD = 'amira2024';
```
Cambiala por la contraseña que quieras.

### 2. Conectar Supabase (base de datos gratuita)
1. Entrá a https://supabase.com y creá una cuenta gratis
2. Creá un proyecto nuevo
3. En el proyecto, andá a SQL Editor y ejecutá:
```sql
create table comentarios (
  id bigint generated always as identity primary key,
  alumna_id bigint,
  alumna_nombre text,
  semana int,
  dia int,
  texto text,
  fecha text,
  created_at timestamptz default now()
);
alter table comentarios enable row level security;
create policy "Public insert" on comentarios for insert with check (true);
create policy "Public select" on comentarios for select using (true);
```
4. En Settings → API copiá:
   - Project URL → pegalo en `SUPABASE_URL` en ambos archivos HTML
   - anon/public key → pegalo en `SUPABASE_KEY`

### 3. Configurar WhatsApp de Amira
En `alumna/index.html` buscá:
```
const WA_NUMBER = '5491100000000';
```
Reemplazá con el número de WhatsApp de Amira (código de país + número, sin +).
Ej: `5491123456789` para Argentina.

## Cómo subir a Vercel

1. Entrá a https://vercel.com — creá cuenta con Google (gratis)
2. "Add New Project" → seleccioná la carpeta `amira-pro`
3. Deploy → en 30 segundos está publicado

URL resultante: `https://amira-pro.vercel.app`

## Links de alumnas

- María → `https://amira-pro.vercel.app/alumna/maria`

Más alumnas se agregan desde el panel y el link se copia con un botón.

## Dominio propio (opcional, ~$15 USD/año)

1. Comprá en https://namecheap.com
2. En Vercel → Settings → Domains → agregar dominio

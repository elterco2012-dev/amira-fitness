const CACHE = 'amira-v3';

const STATIC = [
  '/',
  '/sb.js',
  '/api/manifest.json',
  '/api/seed.json',
  '/api/icon-192.svg',
  '/api/icon-512.svg',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js'
];

// Instalar: cachear estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(STATIC))
      .then(() => self.skipWaiting())
  );
});

// Activar: limpiar caches viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);

  // Supabase: siempre red, fallback JSON vacío
  if (url.hostname.includes('supabase.co')) {
    e.respondWith(
      fetch(req).catch(() =>
        new Response('[]', {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // Fonts / CDN: cache first
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('cdnjs.cloudflare.com')
  ) {
    e.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
          return res;
        });
      })
    );
    return;
  }

  // Navegación HTML: network first, fallback a cache, y última opción offline simple
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(req, clone));
          }
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;

          const home = await caches.match('/');
          if (home) return home;

          return new Response(
            `<!doctype html>
            <html lang="es">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Sin conexión</title>
                <style>
                  body {
                    font-family: sans-serif;
                    background: #f8f8f6;
                    color: #1a1a1a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 24px;
                  }
                  .box {
                    max-width: 360px;
                    background: white;
                    border: 1px solid rgba(0,0,0,.08);
                    border-radius: 16px;
                    padding: 24px;
                    text-align: center;
                  }
                  h1 { margin: 0 0 10px; font-size: 22px; }
                  p { margin: 0; color: #6b7280; line-height: 1.5; }
                </style>
              </head>
              <body>
                <div class="box">
                  <h1>Sin conexión</h1>
                  <p>No pudimos cargar la app en este momento. Probá abrirla otra vez cuando vuelva internet.</p>
                </div>
              </body>
            </html>`,
            {
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            }
          );
        })
    );
    return;
  }

  // Todo lo demás: network first, fallback a cache
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});

// Push notifications
self.addEventListener('push', e => {
  const data = e.data?.json() || {};

  e.waitUntil(
    self.registration.showNotification(data.title || 'Amira Fitness', {
      body: data.body || '¡Es hora de entrenar! 💪',
      icon: '/api/icon-192.svg',
      badge: '/api/icon-192.svg',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/' },
      actions: [
        { action: 'open', title: 'Ver rutina' },
        { action: 'close', title: 'Después' }
      ]
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();

  if (e.action === 'open' || !e.action) {
    e.waitUntil(
      clients.openWindow(e.notification.data?.url || '/')
    );
  }
});
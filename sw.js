const CACHE = 'amira-v7';
const STATIC = [
  '/',
  '/alumna/',
  '/sb.js',
  '/api/manifest.json',
  '/api/icon-192.svg',
  '/api/icon-512.svg',
  '/api/icon-maskable.svg',
  '/api/offline.html',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js'
];

// Instalar: cachear shell de la app
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(STATIC.map(url => c.add(url))))
      .then(() => self.skipWaiting())
  );
});

// Activar: limpiar caches viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: estrategia por tipo de recurso
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Solo interceptar GET
  if (e.request.method !== 'GET') return;

  // Supabase: siempre por red, fallback vacío en offline
  if (url.hostname.includes('supabase.co')) {
    e.respondWith(
      fetch(e.request).catch(() =>
        new Response('[]', { headers: { 'Content-Type': 'application/json' } })
      )
    );
    return;
  }

  // Google Fonts y CDN: cache first (raramente cambian)
  if (url.hostname.includes('fonts.googleapis') ||
      url.hostname.includes('fonts.gstatic') ||
      url.hostname.includes('cdnjs.cloudflare')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // Recursos propios: network first, fallback a cache, luego offline page
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Cachear respuestas exitosas de nuestra propia origin
        if (res.ok && url.origin === self.location.origin) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(async () => {
        const cached = await caches.match(e.request);
        if (cached) return cached;
        // Si es una navegación (HTML), mostrar offline page
        if (e.request.mode === 'navigate') {
          return caches.match('/api/offline.html');
        }
        return new Response('', { status: 408 });
      })
  );
});

// Push notifications
self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(data.title || '💪 ¡Hora de entrenar!', {
      body: data.body || 'Tu entrenamiento de hoy te espera.',
      icon: '/api/icon-192.svg',
      badge: '/api/icon-maskable.svg',
      vibrate: [200, 100, 200, 100, 100],
      tag: 'amira-reminder',
      renotify: true,
      data: { url: data.url || '/alumna/' },
      actions: [
        { action: 'open', title: '🏋️ Ver rutina' },
        { action: 'dismiss', title: 'Después' }
      ]
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'dismiss') return;
  const target = e.notification.data?.url || '/alumna/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // Si la app ya está abierta, enfocarla
        const existing = clientList.find(c => c.url.includes('amira') || c.url.includes('/alumna'));
        if (existing) {
          existing.focus();
          existing.navigate(target);
        } else {
          clients.openWindow(target);
        }
      })
  );
});

// Background sync — sincronizar progreso pendiente cuando vuelve la conexión
self.addEventListener('sync', e => {
  if (e.tag === 'sync-progreso') {
    e.waitUntil(
      self.clients.matchAll().then(clients => {
        clients.forEach(c => c.postMessage({ type: 'SYNC_NOW' }));
      })
    );
  }
});

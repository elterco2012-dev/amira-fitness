const CACHE = 'amira-v4';
const STATIC = [
  '/',
  '/api/sb.js',
  '/api/manifest.json',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js'
];

// Instalar: cachear estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

// Activar: limpiar caches viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => { console.log('SW: eliminando caché viejo:', k); return caches.delete(k); }))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network first para API, cache first para estáticos
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Supabase siempre por red
  if (url.hostname.includes('supabase.co')) {
    e.respondWith(
      fetch(e.request).catch(() => new Response('[]', { headers: { 'Content-Type': 'application/json' } }))
    );
    return;
  }

  // Fonts y CDN: cache first
  if (url.hostname.includes('fonts.googleapis') || url.hostname.includes('cdnjs')) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }))
    );
    return;
  }

  // Todo lo demás: network first, fallback a cache
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// Push notifications
self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'Amira Fitness', {
      body: data.body || '¡Es hora de entrenar! 💪',
      icon: '/api/icon-192.png',
      badge: '/api/icon-192.png',
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
    e.waitUntil(clients.openWindow(e.notification.data?.url || '/'));
  }
});

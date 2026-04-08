// Immobilien Akademie Smart — Service Worker v2
// Strategie: Cache-First für Assets, Network-First für HTML/API
// Auth-Routen niemals cachen!

const CACHE_VERSION = 'ias-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Diese Routen NIEMALS cachen
const NEVER_CACHE = [
  '/api/',
  '/login',
  '/register',
  '/owner',
  '/admin',
  '/auth',
  '/logout',
  '/stripe',
  '/webhook',
];

// Prüfe ob URL gecacht werden darf
function shouldNeverCache(url) {
  const path = new URL(url).pathname;
  return NEVER_CACHE.some(route => path.startsWith(route));
}

// Prüfe ob es ein statisches Asset ist (hat Hash im Namen)
function isStaticAsset(url) {
  const path = new URL(url).pathname;
  return path.startsWith('/assets/') && 
         /\.[a-f0-9]{8,}\.(js|css|png|jpg|svg|woff2?)$/.test(path);
}

// ── INSTALL ──────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installiert:', CACHE_VERSION);
  self.skipWaiting(); // Sofort aktivieren
});

// ── ACTIVATE ─────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Alte Caches löschen
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
        .map(key => {
          console.log('[SW] Alter Cache gelöscht:', key);
          return caches.delete(key);
        })
    );
    // Sofort alle Tabs übernehmen
    await self.clients.claim();
    console.log('[SW] Aktiviert:', CACHE_VERSION);
  })());
});

// ── FETCH ─────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;

  // Nur GET-Requests cachen
  if (request.method !== 'GET') return;

  // Chrome Extensions ignorieren
  if (!url.startsWith('http')) return;

  // Auth/API-Routen: IMMER vom Netzwerk
  if (shouldNeverCache(url)) {
    event.respondWith(fetch(request));
    return;
  }

  // Statische Assets mit Hash: Cache-First (sie ändern sich nie)
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Alles andere (HTML, Seiten): Network-First
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// ── STRATEGIEN ────────────────────────────────────

// Cache-First: Aus Cache laden, nur bei Miss Netzwerk
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    return new Response('Offline', { status: 503 });
  }
}

// Network-First: Netzwerk versuchen, bei Fehler Cache
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    // Offline: aus Cache laden
    const cached = await cache.match(request);
    if (cached) {
      console.log('[SW] Offline — aus Cache:', request.url);
      return cached;
    }
    // Fallback: index.html für App-Routen
    const indexCache = await cache.match('/');
    if (indexCache) return indexCache;
    return new Response('Offline — bitte Internet-Verbindung prüfen', { 
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

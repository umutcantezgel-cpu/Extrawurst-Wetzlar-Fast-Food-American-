/**
 * Service Worker - Offline-First Strategy
 * Workbox-inspired caching with custom logic
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `extrawurst-${CACHE_VERSION}`;
const OFFLINE_PAGE = '/offline.html';

const CRITICAL_ASSETS = [
  '/',
  '/offline.html',
  '/assets/css/main.css',
  '/assets/font/inter-regular.woff2',
  '/assets/font/poppins-bold.woff2',
  '/favicon.svg',
];

// Install: Pre-cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-first with cache fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone response before caching
        const responseToCache = response.clone();

        // Only cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // If HTML request fails and not in cache, show offline page
          if (request.headers.get('accept').includes('text/html')) {
            return caches.match(OFFLINE_PAGE);
          }

          // For other resources, return a fallback or error
          return new Response('Network error', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        });
      })
  );
});

// Background sync (optional, for form submissions)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Implement form sync logic if needed
  console.log('[SW] Syncing forms...');
}

// Push notifications (optional, for future use)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Extrawurst Wetzlar';
  const options = {
    body: data.body || 'Neue Benachrichtigung',
    icon: '/favicon-192x192.png',
    badge: '/favicon-192x192.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

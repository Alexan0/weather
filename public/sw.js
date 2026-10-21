const CACHE_VERSION = 'weather-v1';
const BASE_PATH = new URL('.', self.location.href).pathname.replace(/\/$/, '');
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const WEATHER_CACHE = `${CACHE_VERSION}-weather`;
const CURRENT_CACHES = [STATIC_CACHE, PAGE_CACHE, WEATHER_CACHE];
const MAX_WEATHER_CACHE_ENTRIES = 30;
const NETWORK_TIMEOUT_MS = 5000;
const APP_SHELL = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/saved/`,
  `${BASE_PATH}/manifest.webmanifest`,
  `${BASE_PATH}/icons/icon-192x192.png`,
  `${BASE_PATH}/icons/icon-512x512.png`,
  `${BASE_PATH}/icons/icon-512x512-maskable.png`,
  `${BASE_PATH}/icons/apple-touch-icon.png`
];
const WEATHER_API_HOSTS = new Set(['api.open-meteo.com', 'geocoding-api.open-meteo.com']);
const STATIC_DESTINATIONS = new Set(['font', 'image', 'script', 'style']);

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cache => Promise.allSettled(APP_SHELL.map(url => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(cacheName => cacheName.startsWith('weather-') && !CURRENT_CACHES.includes(cacheName))
            .map(cacheName => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (!['http:', 'https:'].includes(url.protocol)) {
    return;
  }

  if (WEATHER_API_HOSTS.has(url.hostname)) {
    event.respondWith(networkFirst(request, WEATHER_CACHE, true));
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, PAGE_CACHE));
    return;
  }

  if (url.pathname.startsWith(`${BASE_PATH}/_next/static/`) || STATIC_DESTINATIONS.has(request.destination)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  }
});

async function fetchWithTimeout(request) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), NETWORK_TIMEOUT_MS);

  try {
    return await fetch(request, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function networkFirst(request, cacheName, shouldTrim = false) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetchWithTimeout(request);

    if (response.ok) {
      await cache.put(request, response.clone());

      if (shouldTrim) {
        await trimCache(cache, MAX_WEATHER_CACHE_ENTRIES);
      }
    }

    return response;
  } catch {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    if (request.mode === 'navigate') {
      return (await caches.match(`${BASE_PATH}/`)) || Response.error();
    }

    return Response.error();
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  const networkResponse = fetch(request)
    .then(async response => {
      if (response.ok) {
        await cache.put(request, response.clone());
      }

      return response;
    })
    .catch(() => cachedResponse || Response.error());

  return cachedResponse || networkResponse;
}

async function trimCache(cache, maxEntries) {
  const keys = await cache.keys();

  if (keys.length <= maxEntries) {
    return;
  }

  await Promise.all(keys.slice(0, keys.length - maxEntries).map(key => cache.delete(key)));
}

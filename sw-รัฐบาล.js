const CACHE_NAME = 'g-lottery-v1';
const urlsToCache = [
  './',
  './01.html',
  './02.html',   
  './03.html',   
  './04.html',   
  './05.html',  
  './06.html',
  './07.html',
  './08.html',
  './index.html',
  './logo.png',
  './192.png',
  './512.png',
  './manifest-รัฐบาล.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache for g-lottery');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

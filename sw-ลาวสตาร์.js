const CACHE_NAME = 'juckphai-lao-star-app-v1';
const urlsToCache = [
  './',
  './10.html',
  './18.html',
  './01.html',      // หน้าเมนูหลัก
  './02.html',      // แอป 2 ตัว
  './index.html',   // แอป 3 ตัว
  './06.html',      // แอป 4 ตัว
  './10.html',
  './logo.png',
  './192.png',
  './512.png',
  './manifest-ลาวสตาร์.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache for Lao Star App');
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

const CACHE_NAME = 'account-app-cache-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js'
];

// Event: install - ติดตั้ง Service Worker และแคชไฟล์ที่จำเป็น
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Event: activate - จัดการแคชเก่า (ถ้ามี)
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

// Event: fetch - ดักจับ request และตอบกลับด้วยข้อมูลจากแคชก่อน (ถ้ามี)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // ถ้าเจอไฟล์ในแคช, ส่งกลับจากแคชเลย
        if (response) {
          return response;
        }
        // ถ้าไม่เจอ, ไปดึงจาก network
        return fetch(event.request);
      }
    )
  );
});

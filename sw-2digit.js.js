const CACHE_NAME = 'juckphai-2digit-app-v1';
// รายการไฟล์ที่ต้องการแคชสำหรับแอป 2 ตัว
const urlsToCache = [
  './',
  './02.html',
  './index.html', // แคชหน้าแอป 3 ตัวไว้ด้วยเผื่อสลับหน้า
  './manifest-2digit.json',
  './logo.png',
  './icon-192.png',
  './icon-512.png'
];

// ติดตั้ง Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache for 2-digit app');
        return cache.addAll(urlsToCache);
      })
  );
});

// ดึงไฟล์จากแคชเมื่อมีการร้องขอ
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// ลบแคชเก่า
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
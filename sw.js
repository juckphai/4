const CACHE_NAME = 'juckphai-2digit-translator-v1';
// รายการไฟล์ทั้งหมดในโปรเจกต์ที่ต้องการให้ทำงานออฟไลน์
const urlsToCache = [
  './',
  './index.html',
  './03.html',
  './manifest-3digit.json',
  './manifest.json',
  './logo.png',
  './icon-192.png',
  './icon-512.png'
];

// ติดตั้ง Service Worker และแคชไฟล์ทั้งหมด
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
      }
    )
  );
});

// ลบแคชเก่าเมื่อมีการอัปเดตเวอร์ชัน
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

const CACHE_NAME = 'juckphai-number-set-app-v1';

// รายการไฟล์ที่จำเป็นสำหรับแอปนี้และแอปอื่นๆ ที่จะลิงก์ไป
const urlsToCache = [
  './',
  './18.html',
  './01.html',  // หน้าเมนูหลัก
  './logo.png',
  './192.png',
  './512.png',
  './manifest-ชุดตัวเลข.json'
];

// ติดตั้ง Service Worker
self.addEventListener('install', event => {
  self.skipWaiting(); // บังคับให้ Service Worker ใหม่ทำงานทันที
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache for Number Set App');
        return cache.addAll(urlsToCache);
      })
  );
});

// ตอบสนองด้วยไฟล์จากแคชก่อน
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // ถ้าเจอในแคช ให้ส่งกลับไปเลย, ถ้าไม่เจอ ให้ไปดึงจากเน็ตเวิร์ค
        return response || fetch(event.request);
      })
  );
});

// ลบแคชเก่าเมื่อมีการอัปเดต
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

const CACHE_NAME = 'juckphai-3digit-translator-v1';
// รายการไฟล์ที่ต้องการแคชสำหรับหน้าแปลเลข 3 ตัว
const urlsToCache = [
  './',
  './index.html',
  './manifest-3digit.json',
  './logo.png', // โลโก้ที่ใช้ใน popup
  './icon-192.png',
  './icon-512.png',
  'https://juckphai.github.io/juckphai/01.html' // หน้าหลัก
];

// 1. ติดตั้ง Service Worker และทำการแคชไฟล์
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache for 3-digit app');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. ตอบสนองด้วยไฟล์จากแคชเมื่อมีการร้องขอ (Fetch)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // ถ้าเจอไฟล์ในแคช, ส่งไฟล์นั้นกลับไป
        if (response) {
          return response;
        }
        // ถ้าไม่เจอ, ให้ไปดึงจากเน็ตเวิร์คตามปกติ
        return fetch(event.request);
      }
    )
  );
});

// 3. จัดการแคชเก่า (เมื่อมีการอัปเดตเวอร์ชัน)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // ลบแคชที่ไม่ตรงกับเวอร์ชันปัจจุบัน
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

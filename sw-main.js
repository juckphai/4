const CACHE_NAME = 'juckphai-main-menu-v1';
// รายการไฟล์ที่จำเป็นสำหรับหน้าเมนูหลัก
const urlsToCache = [
const urlsToCache = [
  './',
  './01.html',
  './06.html', 
  './18.html',
  './02.html',
  './192.png',
  './512.png',
  './manifest-main.json'
];

// ติดตั้ง Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache for main menu');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // บังคับให้ SW ใหม่ทำงานทันที
  );
});

// ดึงไฟล์จากแคชก่อน ถ้าไม่มีให้ไปดึงจากเน็ตเวิร์ค
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
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

// sw.js - เวอร์ชันปรับปรุง

// กำหนดชื่อและเวอร์ชันของ Cache
// **สำคัญ:** เปลี่ยนเลขเวอร์ชันทุกครั้งที่มีการแก้ไขไฟล์ด้านล่าง!
const CACHE_NAME = 'juckim-pwa-cache-v8';

// รายการไฟล์หลักที่จำเป็นสำหรับ App Shell
const urlsToCache = [
  './', // แคชหน้าหลัก (index.html)
  './style.css',
  './app.js',
  './manifest.json',
  './192.png',
  './512.png'
];

// 1. Event: install - ติดตั้ง Service Worker และแคชไฟล์ทั้งหมด
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching App Shell...');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: Failed to cache App Shell.', error);
      })
  );
  // บังคับให้ Service Worker ใหม่เข้าควบคุมทันที ไม่ต้องรอ
  self.skipWaiting();
});

// 2. Event: activate - จัดการแคชเก่าที่ไม่ต้องการแล้ว
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cache => {
          // ค้นหา cache ที่ขึ้นต้นด้วยชื่อเดียวกัน แต่ไม่ใช่เวอร์ชันปัจจุบัน
          return cache.startsWith('juckim-pwa-cache-') && cache !== CACHE_NAME;
        }).map(cache => {
          console.log('Service Worker: Deleting old cache:', cache);
          return caches.delete(cache);
        })
      );
    })
  );
  // ทำให้ Service Worker ที่ active อยู่ควบคุมหน้าเว็บได้ทันที
  return self.clients.claim();
});

// 3. Event: fetch - จัดการ request ทั้งหมด (กลยุทธ์: Cache First)
self.addEventListener('fetch', event => {
  // จัดการเฉพาะ GET request เท่านั้น
  if (event.request.method !== 'GET') {
      return;
  }
  
  // ค้นหาใน Cache ก่อน ถ้าไม่เจอก็ค่อยไปดึงจาก Network
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // ถ้าเจอใน Cache ให้ส่งกลับไปเลย
        if (response) {
          return response;
        }
        // ถ้าไม่เจอใน Cache ให้ไปดึงจาก Network
        return fetch(event.request);
      })
  );
});

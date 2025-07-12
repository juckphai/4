const CACHE_NAME = 'juckphai-2digit-app-v1';
const urlsToCache = [
  './',
  './02.html',
  './01.html',      // หน้าเมนูหลัก
  './index.html',   // แอป 3 ตัว
  './06.html',      // แอป 4 ตัว
  './18.html',      // แอปสร้างชุด
  './logo.png',
  './192.png',
  './512.png',
  './manifest-2digit.json'
];

self.addEventListener('install', event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))); });
self.addEventListener('fetch', event => { event.respondWith(caches.match(event.request).then(response => response || fetch(event.request))); });
self.addEventListener('activate', event => { const cacheWhitelist = [CACHE_NAME]; event.waitUntil(caches.keys().then(names => Promise.all(names.map(name => { if (cacheWhitelist.indexOf(name) === -1) { return caches.delete(name); } })))); });
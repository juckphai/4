const CACHE_NAME = 'juckphai-main-menu-v6';
const urlsToCache = [
  './',
  './index.html',
  './02.html',   
  './03.html',   
  './04.html',   
  './05.html',  
  './06.html',
  './07.html',
  './08.html',
  './01.html',
  './logo.png',
  './192.png',
  './512.png',
  './manifest-main.json'
  // หมายเหตุ: ลิงก์ที่ไปยัง repository อื่น เช่น juckphai/juckphai หรือ udon-p ไม่สามารถแคชได้
];

self.addEventListener('install', event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))); });
self.addEventListener('fetch', event => { event.respondWith(caches.match(event.request).then(response => response || fetch(event.request))); });
self.addEventListener('activate', event => { const cacheWhitelist = [CACHE_NAME]; event.waitUntil(caches.keys().then(names => Promise.all(names.map(name => { if (cacheWhitelist.indexOf(name) === -1) { return caches.delete(name); } })))); });

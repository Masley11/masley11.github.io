const cacheName = 'GMX LogiCalc-v1.2';
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css',   // si tu mets ton CSS séparé, sinon ignore
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
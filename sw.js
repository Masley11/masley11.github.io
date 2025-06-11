const CACHE_NAME = 'GMX LogiCalc-v4';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/css/style.css',
    '/assets/js/app.js',
    '/assets/img/icon.png',
    '/assets/img/maskable.png',
    '/assets/img/monochrome.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(cached => cached || fetch(e.request))
            .catch(() => {
                if (e.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
            })
    );
});
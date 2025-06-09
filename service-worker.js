const cacheName = 'GMX LogiCalc-v1.2';
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon',
  '/maskable.png'
  '/monochrome.png'
];

// Installation : on met en cache les fichiers listés, en ignorant les erreurs individuelles
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then(async (cache) => {
      for (const file of filesToCache) {
        try {
          await cache.add(file);
        } catch (err) {
          console.warn('Échec du caching du fichier:', file, err);
        }
      }
    })
  );
});

// Activation : nettoyage des anciennes caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(key => key !== cacheName)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Interception des requêtes : réponse par le cache si possible, sinon fetch réseau
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

const CACHE_NAME = 'urdu-kaatib-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './icon.png',
  './manifest.json',
  // Yahan apni mazeed files (CSS/JS) ke naam add karein:
  // './style.css',
  // './app.js'
];

// App install hote waqt files ko cache mein dalna
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Urdu Kaatib: Files cache ho rahi hain...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Purana cache saaf karna
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// Offline mode mein files serve karna
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      return response || fetch(evt.request);
    })
  );
});

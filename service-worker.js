const cacheName = 'hlb-cache-v1';
const filesToCache = [
  './',
  './index.html',
  './Home.jpg',
  './Overview.jpg',
  './Fixed Deposit.jpg',
  './Receipt.jpg',
  './icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});

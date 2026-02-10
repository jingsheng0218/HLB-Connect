const cacheName = 'hlb-connect-v3'; // 升级版本号以清除旧缓存
const filesToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './1_Login.jpg',
  './2_Home.jpg',
  './3_Overview.jpg',
  './4_FixedDeposit.jpg',
  './5_Receipt.jpg',
  './6_Menu.jpg',
  './7_Apply.jpg',
  './8_Activities.jpg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});

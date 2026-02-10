// 1. 更新缓存版本号 (改为 v2，强制浏览器更新缓存)
const cacheName = 'hlb-connect-v2';

// 2. 更新文件列表 (必须与你上传到 GitHub 的文件名一字不差)
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

// 安装 Service Worker
self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      // 如果这里报错，通常是因为列表中某个文件在服务器上不存在
      return cache.addAll(filesToCache);
    })
  );
});

// 激活 Service Worker (清理旧缓存)
self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// 拦截网络请求
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      // 如果缓存里有，就用缓存的；没有就去网上下载
      return response || fetch(e.request);
    })
  );
});

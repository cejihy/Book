const CACHE_NAME = 'epub-reader-v6';
const urlsToCache = [
  './',
  './index.html',
  './epub.min.js',
  './jszip.min.js',
  './manifest.json'
];

// 安装Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 激活Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果缓存中有响应，返回缓存的响应
        if (response) {
          return response;
        }
        
        // 否则从网络获取
        return fetch(event.request).then(
          (response) => {
            // 检查是否获得有效响应
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 克隆响应
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// 处理推送通知
self.addEventListener('push', (event) => {
  const options = {
    body: '您有新的阅读进度',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('EPUB 阅读器', options)
  );
});

// 处理通知点击
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});

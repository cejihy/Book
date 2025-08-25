const CACHE_NAME = 'epub-reader-v5';
const urlsToCache = [
  './',
  './index.html',
  './epub.min.js',
  './jszip.min.js',
  './icon.svg',
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
    icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTIgMTkyIj4KICA8cmVjdCB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgZmlsbD0iIzJjM2U1MCIgcng9IjI0Ii8+CiAgPHJlY3QgeD0iMjQiIHk9IjMyIiB3aWR0aD0iMTQ0IiBoZWlnaHQ9IjEyOCIgZmlsbD0iI2VjZjBmMSIgcng9IjgiLz4KICA8bGluZSB4MT0iMzYiIHkxPSI0OCIgeDI9IjEyMCIgeTI9IjQ4IiBzdHJva2U9IiNiZGMzYzciIHN0cm9rZS13aWR0aD0iMyIvPgogIDxsaW5lIHgxPSIzNiIgeTE9IjYwIiB4Mj0iMTIwIiB5Mj0iNjAiIHN0cm9rZT0iI2JkYzNjNyIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGxpbmUgeDE9IjM2IiB5MT0iNzIiIHgyPSIxMDgiIHkyPSI3MiIgc3Ryb2tlPSIjYmRjM2M3IiBzdHJva2Utd2lkdGg9IjMiLz4KICA8bGluZSB4MT0iMzYiIHkxPSI4NCIgeDI9Ijk2IiB5Mj0iODQiIHN0cm9rZT0iI2JkYzNjNyIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGxpbmUgeDE9IjM2IiB5MT0iOTYiIHgyPSI4NCIgeTI9Ijk2IiBzdHJva2U9IiNiZGMzYzciIHN0cm9rZS13aWR0aD0iMyIvPgogIDxyZWN0IHg9IjE0MCIgeT0iMjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjYwIiBmaWxsPSIjZTc0YzNjIiByeD0iNCIvPgogIDxwb2x5Z29uIHBvaW50cz0iMTQwLDIwIDE0OCwyMCAxNDQsMjgiIGZpbGw9IiNjMDM5MmIiLz4KICA8Y2lyY2xlIGN4PSIxNTYiIGN5PSI0MCIgcj0iMyIgZmlsbD0iIzM0OThiYiIvPgogIDxjaXJjbGUgY3g9IjE1NiIgY3k9IjUyIiByPSIzIiBmaWxsPSIjMzQ5OGJiIi8+CiAgPGNpcmNsZSBjeD0iMTU2IiBjeT0iNjQiIHI9IjMiIGZpbGw9IiMzNDk4YmIiLz4KICA8cmVjdCB4PSI4MCIgeT0iMTIwIiB3aWR0aD0iMzIiIGhlaWdodD0iNCIgZmlsbD0iIzJjM2U1MCIgcng9IjIiLz4KICA8cmVjdCB4PSI4NCIgeT0iMTI4IiB3aWR0aD0iMjQiIGhlaWdodD0iNCIgZmlsbD0iIzJjM2U1MCIgcng9IjIiLz4KICA8cmVjdCB4PSI4OCIgeT0iMTM2IiB3aWR0aD0iMTYiIGhlaWdodD0iNCIgZmlsbD0iIzJjM2U1MCIgcng9IjIiLz4KPC9zdmc+',
    badge: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTIgMTkyIj4KICA8cmVjdCB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgZmlsbD0iIzJjM2U1MCIvPgogIDxyZWN0IHg9IjI0IiB5PSIzMiIgd2lkdGg9IjE0NCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNlY2YwZjEiIHJ4PSI4Ii8+CiAgPGxpbmUgeDE9IjM2IiB5MT0iNDgiIHgyPSIxMjAiIHkyPSI0OCIgc3Ryb2tlPSIjYmRjM2M3IiBzdHJva2Utd2lkdGg9IjMiLz4KICA8bGluZSB4MT0iMzYiIHkxPSI2MCIgeDI9IjEyMCIgeTI9IjYwIiBzdHJva2U9IiNiZGMzYzciIHN0cm9rZS13aWR0aD0iMyIvPgogIDxsaW5lIHgxPSIzNiIgeTE9IjcyIiB4Mj0iMTA4IiB5Mj0iNzIiIHN0cm9rZT0iI2JkYzNjNyIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGxpbmUgeDE9IjM2IiB5MT0iODQiIHgyPSI5NiIgeTI9Ijg0IiBzdHJva2U9IiNiZGMzYzciIHN0cm9rZS13aWR0aD0iMyIvPgogIDxsaW5lIHgxPSIzNiIgeTE9Ijk2IiB4Mj0iODQiIHkyPSI5NiIgc3Ryb2tlPSIjYmRjM2M3IiBzdHJva2Utd2lkdGg9IjMiLz4KICA8cmVjdCB4PSIxNDAiIHk9IjIwIiB3aWR0aD0iOCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2U3NGMzYyIgcng9IjQiLz4KICA8cG9seWdvbiBwb2ludHM9IjE0MCwyMCAxNDgsMjAgMTQ0LDI4IiBmaWxsPSIjYzAzOTJiIi8+CiAgPGNpcmNsZSBjeD0iMTU2IiBjeT0iNDAiIHI9IjMiIGZpbGw9IiMzNDk4YmIiLz4KICA8Y2lyY2xlIGN4PSIxNTYiIGN5PSI1MiIgcj0iMyIgZmlsbD0iIzM0OThiYiIvPgogIDxjaXJjbGUgY3g9IjE1NiIgY3k9IjY0IiByPSIzIiBmaWxsPSIjMzQ5OGJiIi8+CiAgPHJlY3QgeD0iODAiIHk9IjEyMCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjQiIGZpbGw9IiMyYzNlNTAiIHJ4PSIyIi8+CiAgPHJlY3QgeD0iODQiIHk9IjEyOCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMyYzNlNTAiIHJ4PSIyIi8+CiAgPHJlY3QgeD0iODgiIHk9IjEzNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjQiIGZpbGw9IiMyYzNlNTAiIHJ4PSIyIi8+Cjwvc3ZnPg==',
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

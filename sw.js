const CACHE_NAME = 'pharsatify-shell-v1.0.0';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './offline.html',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // หน้า GAS ต้องใช้ข้อมูลสดและอยู่คนละ origin จึงไม่เก็บ cache
  if (url.hostname === 'script.google.com' ||
      url.hostname === 'script.googleusercontent.com') {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('./offline.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request))
  );
});

const CACHE_NAME = "gfr-cache-v1";
const urlsToCache = [
  "/index.html",
  "/manifest.json",
  "/BMitra.ttf",
  "/IRANYekan.ttf",
  "/icon-192.png",
  "/icon-512.png",
  "/service-worker.js"
  // اگر فایل JS یا CSS دیگه‌ای داری که مستقیم استفاده می‌کنی، اینجا اضافه کن
];

// کش کردن فایل‌ها در مرحله نصب
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  console.log("✅ Service Worker: Installed & Files Cached");
});

// پاکسازی کش قدیمی در زمان فعال‌سازی
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// پاسخ‌دهی از کش (و در صورت نبود، از شبکه)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

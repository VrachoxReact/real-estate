const CACHE_NAME = "real-estate-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  // Add other static assets
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

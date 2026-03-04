// TEMP FIX: kill stale caches + unregister legacy service worker
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    } catch (e) {
      console.log("[SW-KILL] cache delete failed", e);
    }

    try {
      await self.registration.unregister();
    } catch (e) {
      console.log("[SW-KILL] unregister failed", e);
    }

    const clients = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });

    for (const client of clients) {
      try {
        client.navigate(client.url);
      } catch (e) {
        console.log("[SW-KILL] client reload failed", e);
      }
    }
  })());
});

self.addEventListener("fetch", () => {
  // bewusst leer – keine Cache-Logik mehr
});

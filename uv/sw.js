importScripts("/uv/uv.bundle.js");
importScripts("/uv/uv.sw.js");
const sw = new UVServiceWorker();
self.addEventListener("fetch", (event) => sw.fetch(event));
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

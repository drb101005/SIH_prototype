self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open("kisanmitra-v1").then(c=>c.addAll([
      "/","/index.html","/style.css","/script.js","/lang.js","/icons.js","/data.js"
    ]))
  );
});
self.addEventListener('fetch', e=>{
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});

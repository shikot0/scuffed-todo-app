self.addEventListener('install', e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./index.html", "./styles.css", "./script.js", "./icons/manifest-icon-192.maskable.png"]);
        })
    );
});

self.addEventListener('fetch', e => {
    console.log(`intercepting fetch request for : ${e.request.url}`)
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})
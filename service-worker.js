const CACHE_NAME = "kjv-bible-v6";

const APP_FILES = [

    "./",
    "./index.html",
    "./reader.html",

    "./css/style.css",
    "./css/reader.css",

    "./js/books.js",
    "./js/bible.js",
    "./js/reader.js",
    "./js/downloader.js",

    "./manifest.json",

    "./data/books.json"

];


// ===============================
// INSTALL
// ===============================

self.addEventListener("install", event => {

    event.waitUntil(

        (async () => {

            const cache = await caches.open(CACHE_NAME);

            await cache.addAll(APP_FILES);

            self.skipWaiting();

        })()

    );

});


// ===============================
// ACTIVATE
// ===============================

self.addEventListener("activate", event => {

    event.waitUntil(

        (async () => {

            const keys = await caches.keys();

            await Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            );

            await self.clients.claim();

        })()

    );

});


// ===============================
// FETCH
// ===============================

self.addEventListener("fetch", event => {

    event.respondWith(

        (async () => {

            const cached = await caches.match(event.request);

            if (cached) {

                return cached;

            }

            try {

                const network = await fetch(event.request);

                const cache = await caches.open(CACHE_NAME);

                cache.put(
                    event.request,
                    network.clone()
                );

                return network;

            }

            catch {

                return new Response(
                    "Offline",
                    {
                        status: 503,
                        statusText: "Offline"
                    }
                );

            }

        })()

    );

});

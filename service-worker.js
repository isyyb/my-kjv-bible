const CACHE_NAME = "kjv-bible-v1";

const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./reader.html",

    "./css/style.css",
    "./css/reader.css",

    "./js/books.js",
    "./js/bible.js",
    "./js/reader.js",

    "./manifest.json",

    "./data/books.json"

];


// Install

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

});


// Activate

self.addEventListener("activate", event => {

    event.waitUntil(

        self.clients.claim()

    );

});


// Fetch

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            return response || fetch(event.request);

        })

    );

});
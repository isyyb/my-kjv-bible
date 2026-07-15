const CACHE_NAME = "kjv-bible-v3";

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

    "./data/books.json",

    "./data/books/01_Genesis.json",
    "./data/books/02_Exodus.json",
    "./data/books/03_Leviticus.json",
    "./data/books/04_Numbers.json",
    "./data/books/05_Deuteronomy.json",
    "./data/books/06_Joshua.json",
    "./data/books/07_Judges.json",
    "./data/books/08_Ruth.json",
    "./data/books/09_1Samuel.json",
    "./data/books/10_2Samuel.json",
    "./data/books/11_1Kings.json",
    "./data/books/12_2Kings.json",
    "./data/books/13_1Chronicles.json",
    "./data/books/14_2Chronicles.json",
    "./data/books/15_Ezra.json",
    "./data/books/16_Nehemiah.json",
    "./data/books/17_Esther.json",
    "./data/books/18_Job.json",
    "./data/books/19_Psalms.json",
    "./data/books/20_Proverbs.json",
    "./data/books/21_Ecclesiastes.json",
    "./data/books/22_SongOfSolomon.json",
    "./data/books/23_Isaiah.json",
    "./data/books/24_Jeremiah.json",
    "./data/books/25_Lamentations.json",
    "./data/books/26_Ezekiel.json",
    "./data/books/27_Daniel.json",
    "./data/books/28_Hosea.json",
    "./data/books/29_Joel.json",
    "./data/books/30_Amos.json",
    "./data/books/31_Obadiah.json",
    "./data/books/32_Jonah.json",
    "./data/books/33_Micah.json",
    "./data/books/34_Nahum.json",
    "./data/books/35_Habakkuk.json",
    "./data/books/36_Zephaniah.json",
    "./data/books/37_Haggai.json",
    "./data/books/38_Zechariah.json",
    "./data/books/39_Malachi.json",

    "./data/books/40_Matthew.json",
    "./data/books/41_Mark.json",
    "./data/books/42_Luke.json",
    "./data/books/43_John.json",
    "./data/books/44_Acts.json",
    "./data/books/45_Romans.json",
    "./data/books/46_1Corinthians.json",
    "./data/books/47_2Corinthians.json",
    "./data/books/48_Galatians.json",
    "./data/books/49_Ephesians.json",
    "./data/books/50_Philippians.json",
    "./data/books/51_Colossians.json",
    "./data/books/52_1Thessalonians.json",
    "./data/books/53_2Thessalonians.json",
    "./data/books/54_1Timothy.json",
    "./data/books/55_2Timothy.json",
    "./data/books/56_Titus.json",
    "./data/books/57_Philemon.json",
    "./data/books/58_Hebrews.json",
    "./data/books/59_James.json",
    "./data/books/60_1Peter.json",
    "./data/books/61_2Peter.json",
    "./data/books/62_1John.json",
    "./data/books/63_2John.json",
    "./data/books/64_3John.json",
    "./data/books/65_Jude.json",
    "./data/books/66_Revelation.json"

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

            if (response) {

                return response;

            }


            return fetch(event.request)

            .then(networkResponse => {


                return caches.open(CACHE_NAME)

                .then(cache => {


                    cache.put(

                        event.request,

                        networkResponse.clone()

                    );


                    return networkResponse;


                });


            });


        })

    );

});
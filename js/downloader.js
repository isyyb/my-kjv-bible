const downloadButton = document.getElementById("downloadBible");
const downloadStatus = document.getElementById("downloadStatus");

const CACHE_NAME = "kjv-bible-v6";

downloadButton.addEventListener("click", async () => {

    downloadButton.disabled = true;

    try {

        downloadStatus.textContent = "Opening cache...";

        const cache = await caches.open(CACHE_NAME);

        console.log("Cache opened:", CACHE_NAME);

        downloadStatus.textContent = "Loading books list...";

        const response = await fetch("./data/books.json");

        console.log("books.json status:", response.status);

        const books = await response.json();

        console.log("Books found:", books.length);

        let count = 0;

        for (const book of books) {

            const url = "./data/books/" + book.file;

            try {

                downloadStatus.textContent =
                    `Downloading ${book.name} (${count + 1}/${books.length})`;

                console.log("Caching:", url);

                const r = await fetch(url);

                console.log(url, r.status);

                if (!r.ok) {

                    throw new Error("HTTP " + r.status);

                }

                await cache.put(url, r.clone());

                count++;

            }

            catch (err) {

                console.error("FAILED:", url, err);

            }

        }

        downloadStatus.textContent =
            `Finished. Cached ${count} of ${books.length} books.`;

    }

    catch (err) {

        console.error(err);

        downloadStatus.textContent =
            "Download failed.";

    }

    downloadButton.disabled = false;

});
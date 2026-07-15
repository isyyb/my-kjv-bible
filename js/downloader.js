const downloadButton = document.getElementById("downloadBible");
const downloadStatus = document.getElementById("downloadStatus");

const CACHE_NAME = "kjv-bible-v6";


// ===============================
// DOWNLOAD BIBLE
// ===============================

downloadButton.addEventListener("click", async () => {

    downloadButton.disabled = true;

    downloadStatus.textContent = "Preparing Bible download...";


    try {

        const response = await fetch("./data/books.json");

        const books = await response.json();


        const cache = await caches.open(CACHE_NAME);


        let count = 0;


        for (const book of books) {

            try {

                await cache.add(
                    "./data/books/" + book.file
                );


                count++;


                downloadStatus.textContent =
                    `Downloading ${book.name} (${count}/${books.length})`;


            }

            catch (error) {

                console.error(
                    "Failed:",
                    book.file,
                    error
                );

            }

        }


        downloadStatus.textContent =
            "Bible download completed. You can now read offline.";


    }

    catch (error) {

        console.error(error);


        downloadStatus.textContent =
            "Download failed. Check your internet connection.";

    }


    downloadButton.disabled = false;

});

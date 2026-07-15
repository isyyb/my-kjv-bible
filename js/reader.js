// ==========================================
// Get URL Parameters
// ==========================================

const params = new URLSearchParams(window.location.search);

let currentBook = parseInt(params.get("book")) || 1;
let currentChapter = parseInt(params.get("chapter")) || 1;

// ==========================================
// Initialize Reader
// ==========================================

window.addEventListener("DOMContentLoaded", initReader);

async function initReader() {

    await displayChapter();

    document
        .getElementById("prevChapter")
        .addEventListener("click", previousChapter);

    document
        .getElementById("nextChapter")
        .addEventListener("click", nextChapter);

}

// ==========================================
// Display Chapter
// ==========================================

async function displayChapter() {

    const result = await getChapter(currentBook, currentChapter);

    document.getElementById("bookName").textContent =
        result.book.name;

    document.getElementById("chapterNumber").textContent =
        "Chapter " + currentChapter;

    const container =
        document.getElementById("chapterContainer");

    container.innerHTML = "";

    result.verses.forEach((text, index) => {

        const verse = document.createElement("div");

        verse.className = "verse";

        verse.innerHTML = `

            <span class="verse-number">

                ${index + 1}

            </span>

            <span class="verse-text">

                ${text}

            </span>

        `;

        verse.addEventListener("click", function () {

            verse.classList.toggle("highlight");

        });

        container.appendChild(verse);

    });

}

// ==========================================
// Previous Chapter
// ==========================================

async function previousChapter() {

    const location =
        await getPreviousChapter(currentBook, currentChapter);

    currentBook = location.book;

    currentChapter = location.chapter;

    updateURL();

    displayChapter();

}

// ==========================================
// Next Chapter
// ==========================================

async function nextChapter() {

    const location =
        await getNextChapter(currentBook, currentChapter);

    currentBook = location.book;

    currentChapter = location.chapter;

    updateURL();

    displayChapter();

}

// ==========================================
// Update Browser URL
// ==========================================

function updateURL() {

    history.replaceState(

        null,

        "",

        `reader.html?book=${currentBook}&chapter=${currentChapter}`

    );

}re
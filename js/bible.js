// ==========================================
// Bible Engine
// ==========================================

let books = [];
const bookCache = {};

// ==========================================
// Load Book Metadata
// ==========================================

async function loadBooks() {

    if (books.length > 0) {
        return books;
    }

    const response = await fetch("data/books.json");

    books = await response.json();

    return books;

}

// ==========================================
// Get One Book
// ==========================================

async function getBook(bookId) {

    await loadBooks();

    return books.find(book => book.id === bookId);

}

// ==========================================
// Load Book JSON
// ==========================================

async function loadBook(bookId) {

    if (bookCache[bookId]) {
        return bookCache[bookId];
    }

    const book = await getBook(bookId);

    const response = await fetch(`data/books/${book.file}`);

    const json = await response.json();

    bookCache[bookId] = json;

    return json;

}

// ==========================================
// Get Chapter
// ==========================================

async function getChapter(bookId, chapterNumber) {

    const book = await getBook(bookId);

    const json = await loadBook(bookId);

    return {

        book,

        chapter: chapterNumber,

        verses: json[chapterNumber - 1]

    };

}

// ==========================================
// Previous Chapter
// ==========================================

async function getPreviousChapter(bookId, chapterNumber) {

    const book = await getBook(bookId);

    if (chapterNumber > 1) {

        return {

            book: bookId,

            chapter: chapterNumber - 1

        };

    }

    if (bookId === 1) {

        return {

            book: 1,

            chapter: 1

        };

    }

    const previousBook = await getBook(bookId - 1);

    return {

        book: previousBook.id,

        chapter: previousBook.chapters

    };

}

// ==========================================
// Next Chapter
// ==========================================

async function getNextChapter(bookId, chapterNumber) {

    const book = await getBook(bookId);

    if (chapterNumber < book.chapters) {

        return {

            book: bookId,

            chapter: chapterNumber + 1

        };

    }

    if (bookId === books.length) {

        return {

            book: book.id,

            chapter: book.chapters

        };

    }

    return {

        book: bookId + 1,

        chapter: 1

    };

}
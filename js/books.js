// ==========================================
// Load Books
// ==========================================

async function loadBooks() {

    try {

        const response = await fetch("data/books.json");
        const books = await response.json();

        displayBooks(books);

    } catch (error) {

        console.error("Unable to load books.", error);

    }

}

// ==========================================
// Display Books
// ==========================================

function displayBooks(books) {

    const oldContainer = document.getElementById("old-testament");
    const newContainer = document.getElementById("new-testament");

    books.forEach(book => {

        const link = document.createElement("a");

        link.href = "#";

        link.textContent = book.name;

        link.addEventListener("click", function (event) {

            event.preventDefault();

            openBook(book);

        });

        if (book.testament === "OT") {

            oldContainer.appendChild(link);

        } else {

            newContainer.appendChild(link);

        }

    });

}

// ==========================================
// Open Book
// ==========================================

function openBook(book) {

    const url =
        `reader.html?book=${book.id}&chapter=1`;

    window.location.href = url;

}

// ==========================================
// Start Application
// ==========================================

loadBooks();

function getBookIds() {
    let idsStr = localStorage.getItem("ids");
    if (!idsStr) {
        return null;
    }
    let ids = idsStr.split(",");
    ids.splice(ids.length-1, 1);
    return ids;
}

let library = []
function setLibrary() {
    let books = getBookIds();
    library = []
    if (books) {
        for (let i = 0; i < books.length; i++) {
            let id = books[i];
            let book = JSON.parse(localStorage.getItem(id));
            library.push(book);
        }
    }
}


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        let books = getBookIds();
        if (books) {
            let lastId = books[parseInt(books.length-1)];
            this.id = lastId + 1;
        } else {
            this.id = 0;
        }
        
    }
}

function updateStats() {
    let totalPages = 0;
    let totalBooks = 0;
    let booksRead = 0;
    library.forEach(book => {
        totalPages += book.pages;
        totalBooks++;
        if (book.read) {
            booksRead++;
        }
    });
    document.getElementById("total-pages").textContent = totalPages;
    document.getElementById("total-books").textContent = totalBooks;
    document.getElementById("books-read").textContent = booksRead;
}


function updatePage() {
    let booksContainer = document.getElementById("books");
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.firstChild);
    }
    let bookIds = getBookIds();
    if (!bookIds) {
        return;
    }
    for (let i = 0; i < bookIds.length; i++) {
        let book = JSON.parse(localStorage.getItem(bookIds[i]));
        // create book card element
        let bookCard = document.createElement("div");
        bookCard.className = "card";
        // add title element
        let title = document.createElement("h2");
        title.textContent = book.title;
        title.className = "title";
        bookCard.appendChild(title);
        // add author element
        let author = document.createElement("h3");
        author.textContent = `by ${book.author}`;
        bookCard.appendChild(author);
        // add pages element
        let pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;
        bookCard.appendChild(pages);
        // add read checkbox and label
        let readLabel = document.createElement("label");
        readLabel.htmlFor = "read";
        readLabel.textContent = "Read";
        bookCard.appendChild(readLabel);
        let read = document.createElement("input");
        read.type = "checkbox";
        read.checked = book.read;
        read.id = "read";
        read.className = "read";
        bookCard.appendChild(read);
        // add button to remove book
        let remove = document.createElement("button");
        remove.className = "remove";
        remove.textContent = "Remove";
        remove.style['float'] = "right";
        bookCard.appendChild(remove);
        document.getElementById("books").appendChild(bookCard);
    }
    updateStats();
}




document.getElementById("add-book-button").addEventListener("click", () => {
    document.getElementById("add-book-modal").style['display'] = "block";
});


document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("add-book-modal").style['display'] = "none";
});

document.getElementById("add-book-submit").addEventListener("click", () => {
    let title = document.getElementById("add-book-title").value;
    let author = document.getElementById("add-book-author").value;
    let pages = parseInt(document.getElementById("add-book-pages").value);
    let read = document.getElementById("add-book-read").checked;
    addBook(title, author, pages, read);
    document.getElementById("add-book-modal").style['display'] = "none";
});


setLibrary();
updatePage();


function setReadButtons() {
    let readButtons = document.getElementsByClassName("read");
    for (let button of readButtons) {
        button.addEventListener("change", () => {
            let parentBookCard = button.parentElement;
            let title = parentBookCard.getElementsByClassName("title")[0].textContent;
            let index = library.findIndex((book) => {
                return book.title == title;
            });
            let book = library[index];
            book.read = button.checked;
            localStorage.setItem(book.id, JSON.stringify(book));
            updateStats();
        });
    }
}


function setRemoveButtons() {
    let removeButtons = document.getElementsByClassName("remove");
    for (let button of removeButtons) {
        button.addEventListener("click", () => {
            let parentBookCard = button.parentElement;
            let title = parentBookCard.getElementsByClassName("title")[0].textContent;
            let index = library.findIndex((book) => {
                return book.title == title;
            });
            localStorage.removeItem(library[index].id.toString());
            let ids = localStorage.getItem("ids");
            let newIds = ids.replace(library[index].id.toString() + ",", "");
            localStorage.setItem("ids", newIds);
            setLibrary();
            updatePage();
        });
    }  
}

function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    // CHECK FOR UNIQUE TITLE
    let ids = localStorage.getItem("ids");
    ids = ids + book.id + ",";
    localStorage.setItem("ids", ids);
    localStorage.setItem(book.id, JSON.stringify(book));
    setLibrary();
    updatePage();
    setRemoveButtons();
    setReadButtons()
}

setRemoveButtons();
setReadButtons();
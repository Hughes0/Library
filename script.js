
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

let books = [
    new Book("This is a very long title that will either break everything or wrap", "Author", 193, true),
    new Book("Title 2", "Author 2", 205, false),
    new Book("Title 3", "Author 3", 332, true),
    new Book("Title 4", "Author 4", 395, true),
    new Book("title 5", "Author 5", 582, false)
];


function updatePage() {
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        // create book card element
        let bookCard = document.createElement("div");
        bookCard.className = "card";
        // add title element
        let title = document.createElement("h2");
        title.textContent = book.title;
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
        bookCard.appendChild(read);
        // add button to remove book
        let remove = document.createElement("button");
        remove.className = "remove";
        remove.textContent = "Remove";
        remove.style['float'] = "right";
        bookCard.appendChild(remove);
        document.getElementById("books").appendChild(bookCard);
    }
}


function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    books.push(book);
    updatePage();
}

updatePage();
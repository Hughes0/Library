
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
    let booksContainer = document.getElementById("books");
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.firstChild);
    }

    for (let i = 0; i < books.length; i++) {
        let book = books[i];
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
        bookCard.appendChild(read);
        // add button to remove book
        let remove = document.createElement("button");
        remove.className = "remove";
        remove.textContent = "Remove";
        remove.style['float'] = "right";
        bookCard.appendChild(remove);
        document.getElementById("books").appendChild(bookCard);
    }
    let removeButtons = document.getElementsByClassName("remove");
    for (let button of removeButtons) {
        button.addEventListener("click", () => {
            let parentBookCard = button.parentElement;
            let title = parentBookCard.getElementsByClassName("title")[0].textContent;
            for (let i = 0; i < books.length; i++) {
                if (books[i].title == title) {
                    books.splice(i, 1);
                }
            }
            updatePage();
        });
    }    
}


function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    books.push(book);
    updatePage();
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


updatePage();



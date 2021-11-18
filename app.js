// Creating an array to append new book objects too
let myLibrary = [];
// Checking for local storage
if (window.localStorage.myLibrary != undefined) {
    myLibrary = JSON.parse(window.localStorage.myLibrary);
}
document.addEventListener("DOMContentLoaded", function () {
    // Getting the form
    const form = document.getElementById('book_form');

    // Creating a book card with a function
    const createBookItem = (author, title, read) => {
        let outerDiv = document.createElement('div');
        outerDiv.className = 'book_card';
        outerDiv.innerHTML = `
            <button class="btn close">X</button>
            <div class="book_author card_child">${author}</div>
            <div class="book_title card_child">${title}</div>
            <button class="book_read card_child btn ${read ? "finished" : "not_finished"}">${read ? "Read" : "Not Read"}</button>
            `
        return outerDiv;
    };

    // Showing any new books to the book shelf
    const displayLibrary = (firstLoad = false) => {
        const shelf = document.getElementById('shelf');
        const bookForm = document.getElementById('book_form')
        const libLength = myLibrary.length - 1;
        if (libLength == -1) return
        if (firstLoad == true) {
            for (let i = 0; i <= libLength; i++) {
                const title = myLibrary[i]["title"];
                const author = myLibrary[i]["author"];
                const read = myLibrary[i]["read"];
                const newBook = createBookItem(author, title, read);
                shelf.insertBefore(newBook, bookForm);
            }
        } else {
            const title = myLibrary[libLength]["title"];
            const author = myLibrary[libLength]["author"];
            const read = myLibrary[libLength]["read"];
            const newBook = createBookItem(author, title, read);
            shelf.insertBefore(newBook, bookForm);
        }
        let closeBtns = document.querySelectorAll('.close');
        let readBtns = document.querySelectorAll('.book_read');
        if (firstLoad == true) {
            closeBtns.forEach(btn => {
                btn.addEventListener('click', e => {
                    // Selecting the title for deletion
                    const titleDlt = e.target.parentElement.querySelector(".book_title").innerHTML;
                    // Finding the location of the object with this title
                    const indexDlt = myLibrary.findIndex(x => x.title === titleDlt);
                    // Removing that object form the library array and updating local storage
                    myLibrary.splice(indexDlt, 1);
                    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
                    // Removing the book card
                    e.target.parentElement.remove();
                })
            })
            readBtns.forEach(btn => {
                btn.addEventListener('click', e => {
                    const titleDlt = e.target.parentElement.querySelector(".book_title").innerHTML;
                    const indexDlt = myLibrary.findIndex(x => x.title === titleDlt);
                    e.target.classList.toggle('finished');
                    e.target.classList.toggle('not_finished')
                    if (e.target.innerHTML == 'Read') {
                        e.target.innerHTML = 'Not Read';
                        myLibrary[indexDlt]["read"] = false;
                    } else {
                        e.target.innerHTML = 'Read';
                        myLibrary[indexDlt]["read"] = true;
                    }
                    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
                })
            })
        } else {
            closeBtns[closeBtns.length - 1].addEventListener('click', e => {
                // Selecting the title for deletion
                const titleDlt = e.target.parentElement.querySelector(".book_title").innerHTML;
                // Finding the location of the object with this title
                const indexDlt = myLibrary.findIndex(x => x.title === titleDlt);
                // Removing that object form the library array and updating local storage
                myLibrary.splice(indexDlt, 1);
                localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
                // Removing the book card
                e.target.parentElement.remove();
            })
            readBtns[readBtns.length - 1].addEventListener('click', e => {
                const titleDlt = e.target.parentElement.querySelector(".book_title").innerHTML;
                const indexDlt = myLibrary.findIndex(x => x.title === titleDlt);
                e.target.classList.toggle('finished');
                e.target.classList.toggle('not_finished')
                if (e.target.innerHTML == 'Read') {
                    e.target.innerHTML = 'Not Read';
                    myLibrary[indexDlt]["read"] = false;
                } else {
                    e.target.innerHTML = 'Read';
                    myLibrary[indexDlt]["read"] = true;
                }
                localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
            })
        }
    }
    // Creating a function which gets the information entered into the form
    const addBookToLibrary = (event) => {
        event.preventDefault(); //stops the form from submitting
        const title = document.getElementById('title').value
        const author = document.getElementById('author').value
        const read = document.getElementById('read').checked
        const newBook = { author, title, read };
        myLibrary.push(newBook);
        // Setting the local storage
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
        form.reset();
        displayLibrary();
    };
    displayLibrary(true);
    // Waiting for the form to be submitted to run the functions
    form.addEventListener('submit', addBookToLibrary)
});
// Creating an array to append new book objects too
let myLibrary = [];
// Getting the form
const form = document.getElementById('book_form');


// Creating a book card with a function
const createBookItem = (author, title, read)=>{
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
const displayLibrary = () =>{
    const shelf = document.getElementById('shelf');
    const bookForm = document.getElementById('book_form')
    const i = myLibrary.length - 1;
    const title = myLibrary[i]["title"];
    const author = myLibrary[i]["author"];
    const read = myLibrary[i]["read"];
    const newBook =  createBookItem(author, title, read);
    shelf.insertBefore(newBook, bookForm);
}
// Creating a function which gets the information entered into the form
const addBookToLibrary = (event) =>{
    event.preventDefault(); //stops the form from submitting
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const read = document.getElementById('read').checked
    const newBook = {author, title, read};
    myLibrary.push(newBook);
    form.reset();
    displayLibrary();
    let closeBtns = document.querySelectorAll('.close');
    closeBtns[closeBtns.length - 1].addEventListener('click', e =>{
        e.target.parentElement.remove();
    })
};
// Waiting for the form to be submitted to run the functions
form.addEventListener('submit', addBookToLibrary)
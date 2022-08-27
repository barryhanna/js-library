// TODO: Bug fix - when table is removed the 'New Book' button doesn't work

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.toggleRead = () => (this.read = !this.read);
}

let myLibrary = [
  new Book('Book 1', 'Some Author', 75, true),
  new Book('Book 2', 'Author', 25, false),
  new Book('Book 3', 'Author 2', 353, true),
  new Book('Book 4', 'Someone', 123, false),
];

const form = document.querySelector('form');
const showFormBtn = document.querySelector('.show-form');

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function toggleBookRead(id) {
  myLibrary[id].toggleRead();
  showBooks();
}

function showBooks() {
  let table = document.querySelector('table');
  if (table === null) {
    table = document.createElement('table');
  }
  table.innerHTML = '';
  const main = document.querySelector('main');

  table.innerHTML += `<thead><tr style="text-align: left;"><th hidden>id</th><th>Title</th><th>Author</th><th>Pages</th><th>Read?</th></tr></thead><tdbody>`;
  let bookRows = '';
  if (myLibrary.length > 0) {
    myLibrary.forEach(
      (book, index) =>
        (bookRows += `<tr><td hidden>${index}</td><td>${book.title}</td><td>${book.author}</td><td style="text-align: right;">${book.pages}</td><td onclick='toggleBookRead(${index})'>${book.read}</td><td><button onclick='deleteBookFromLibrary(${index})'>x</button></td></tr>`)
    );
    bookRows += '</body>';
    table.innerHTML += bookRows;
    main.appendChild(table);
  } else {
    document.querySelector('table').remove();
    main.innerHTML +=
      "There are no books in your library. Click 'New Book' to add one";
  }
}

function deleteBookFromLibrary(id) {
  myLibrary = [...myLibrary.slice(0, id), ...myLibrary.slice(id + 1)];
  showBooks();
}

const hideForm = () => {
  form.style.visibility = 'hidden';
  showFormBtn.textContent = 'New Book';
};

const showForm = () => {
  form.style.visibility = 'visible';
  showFormBtn.textContent = 'Cancel';
};

hideForm();

showFormBtn.addEventListener('click', (e) => {
  form.style.visibility === 'hidden' ? showForm() : hideForm();
});

document.querySelector('.add-book-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  clearForm();
  showBooks();
  hideForm();
});

function clearForm() {
  document.getElementsByTagName('form')[0].reset();
}

if (myLibrary.length > 0) {
  showBooks();
}

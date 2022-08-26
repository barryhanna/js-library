let myLibrary = [
  { title: 'Book 1', author: 'Some Author', pages: 75, read: true },
  { title: 'Book 2', author: 'Author', pages: 25, read: false },
  { title: 'Book 3', author: 'Author 2', pages: 353, read: true },
  { title: 'Book 4', author: 'Someone', pages: 123, read: false },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function showBooks() {
  let table = document.querySelector('table');
  if (table === null) {
    table = document.createElement('table');
  }
  table.innerHTML = '';
  const main = document.querySelector('main');

  table.innerHTML += `<tr><th>id</th><th>Title</th><th>Author</th><th>Pages</th><th>Read?</th></tr>`;
  let bookRows = '';
  myLibrary.forEach(
    (book, index) =>
      (bookRows += `<tr><td>${index}</td><td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.read}</td><td><button onclick='deleteBookFromLibrary(${index})'>X</button></td></tr>`)
  );
  table.innerHTML += bookRows;
  main.appendChild(table);
}

function deleteBookFromLibrary(id) {
  myLibrary = [...myLibrary.slice(0, id), ...myLibrary.slice(id + 1)];
  showBooks();
}

const form = document.querySelector('form');
form.style.visibility = 'hidden';

const showFormBtn = document.querySelector('.show-form');

showFormBtn.addEventListener('click', (e) => {
  if (form.style.visibility === 'hidden') {
    form.style.visibility = 'visible';
    showFormBtn.textContent = 'Cancel';
  } else {
    form.style.visibility = 'hidden';
    showFormBtn.textContent = 'New Book';
  }
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
});

function clearForm() {
  document.getElementsByTagName('form')[0].reset();
}

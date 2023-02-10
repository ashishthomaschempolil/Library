const myLibrary = {}
const addButton = document.getElementById('add-card-initial')

// Books
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 295)
const theLordOfTheRings = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1216, 1216)
const theSilmarillion = new Book('The Silmarillion', 'J.R.R. Tolkien', 480, 480)

// Book constructor
function Book (title, author, totalPages, nPagesRead) {
  this.title = title
  this.author = author
  this.totalPages = totalPages
  this.nPagesRead = nPagesRead
}

// Book prototype methods
Book.prototype.createBookCard = function createBookCard () {
  const bookDiv = document.createElement('div')
  bookDiv.classList.add('book-card')
  bookDiv.innerHTML = `
      <div class="book-card__title"><h2>${this.title}</h2></div>
      <div class="book-card__author"><h3>by ${this.author}</h3></div>
      <div class="book-card__pages"><p>${this.nPagesRead} / ${this.totalPages} pages read</p></div>
      <div class="remove-button"><button>Remove</button></div>
      `
  return bookDiv
}

// functions
function addBookToLibrary (book) {
  // convert book title to lowercase
  const title = book.title.toLowerCase()
  myLibrary[title] = book
  render()
}

function removeBook (e) {
  console.log(e.target)
  const bookCard = e.target.parentElement.parentElement // get parent element
  const title = bookCard.querySelector('.book-card__title h2').textContent.toLowerCase()
  delete myLibrary[title]
  render()
}

function render () {
  const library = document.querySelector('.content')
  library.innerHTML = ''
  for (const book in myLibrary) {
    const bookCard = myLibrary[book].createBookCard()
    library.appendChild(bookCard)
  }
  library.appendChild(addButton)

  // add event listeners to remove buttons (the updated ones)
  const removeButton = document.querySelectorAll('.remove-button')
  removeButton.forEach(button => {
    button.addEventListener('click', removeBook)
  })
}

// add books to library
function addBookFromForm (e) {
  e.preventDefault()
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const totalPages = document.getElementById('total-pages').value
  const nPagesRead = document.getElementById('pages-read').value || 0

  // make sure the book doesn't already exist and also title, author and totalPages are not empty
  if (!title || !author || !totalPages) {
    alert('Please enter all the required fields')
    return
  } else if (myLibrary[title]) {
    alert('This book already exists in your library')
    return
  }

  const book = new Book(title, author, totalPages, nPagesRead)
  addBookToLibrary(book)

  // reset form
  const form = document.getElementById('add-card-form')
  form.style.display = 'none'
  const addButton = document.querySelector('.add-card')
  addButton.style.display = 'flex'
  form.reset()

  render()
}

addBookToLibrary(theHobbit)
addBookToLibrary(theLordOfTheRings)
addBookToLibrary(theSilmarillion)

addButton.addEventListener('click', () => {
  const form = document.getElementById('add-card-form')
  form.style.display = 'flex'
  const addButton = document.querySelector('.add-card')
  addButton.style.display = 'none'

  // if the user clicks on anywhere outside the form, close it
  window.onclick = function (event) {
    if (event.target === form) {
      form.style.display = 'none'
      addButton.style.display = 'flex'
    }
  }
})

const submitButton = document.getElementById('submit')
submitButton.addEventListener('click', addBookFromForm)

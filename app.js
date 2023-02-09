const myLibrary = []

function Book (title, author, totalPages, nPagesRead) {
  this.title = title
  this.author = author
  this.totalPages = totalPages
  this.nPagesRead = nPagesRead
}

function addBookToLibrary (book) {
  myLibrary.push(book)
  render()
}

function createBookCard (book) {
  const bookDiv = document.createElement('div')
  bookDiv.classList.add('book-card')
  bookDiv.innerHTML = `
    <div class="book-card__title"><h2>${book.title}</h2></div>
    <div class="book-card__author"><h3>by ${book.author}</h3></div>
    <div class="book-card__pages"><p>${book.nPagesRead} / ${book.totalPages} pages read</p></div>
    <div class="remove-button"><button>Remove</button></div>
    `
  return bookDiv
}

function removeBook (e) {
  if (e.target.classList.contains('remove-button')) {
    const bookCard = e.target.parentElement
    bookCard.remove()
  }
  render()
}

function render () {
  const library = document.querySelector('.content')
  library.innerHTML = ''
  myLibrary.forEach(book => {
    const bookDiv = createBookCard(book)
    library.appendChild(bookDiv)
  })
}

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 295)
// const theLordOfTheRings = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1216, 1216)
// const theSilmarillion = new Book('The Silmarillion', 'J.R.R. Tolkien', 480, 480)

// // addBookToLibrary(theLordOfTheRings)
// // addBookToLibrary(theSilmarillion)

// // render()

// const library = document.querySelector('.content')
// library.addEventListener('click', removeBook)

// console.log(myLibrary)

const addButton = document.getElementById('add-card-initial')
addButton.addEventListener('click', () => {
  const form = document.getElementById('add-card-form')
  form.style.display = 'block'
  const addButton = document.querySelector('.add-card')
  addButton.style.display = 'none'
})

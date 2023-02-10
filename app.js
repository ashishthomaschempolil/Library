const myLibrary = {}
const addButton = document.getElementById('add-card-initial')

// Books
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false)
const theLordOfTheRings = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1216, false)
const theSilmarillion = new Book('The Silmarillion', 'J.R.R. Tolkien', 480, true)

// Book constructor
function Book (title, author, totalPages, read = false) {
  this.title = title
  this.author = author
  this.totalPages = totalPages
  this.read = read
}

// Book prototype methods
Book.prototype.createBookCard = function createBookCard () {
  const bookDiv = document.createElement('div')
  bookDiv.classList.add('book-card')
  bookDiv.innerHTML = `
      <div class="book-card__title"><h2>${this.title}</h2></div>
      <div class="book-card__author"><h3>${this.author}</h3></div>
      <div class="book-card__total-pages"><p>Total Pages: ${this.totalPages}</p></div>
      <div class="book-card__buttons">
        <div class="remove-button"><button>Remove</button></div>
        <div class="read-button"><label for="read">Finished Reading?</label><input type="checkbox" name="read" id="read" ${this.read ? 'checked' : ''}></div>
      </div>
      `
  return bookDiv
}

// function to toggle read status
Book.prototype.toggleRead = function toggleRead () {
  this.read = !this.read
}

// functions
function addBookToLibrary (book) {
  // convert book title to lowercase
  const title = book.title.toLowerCase()
  const author = book.author.toLowerCase()
  const key = title + '_' + author
  myLibrary[key] = book
  render()
}

function removeBook (e) {
  console.log(e.target)
  const bookCard = e.target.parentElement.parentElement.parentElement // get parent element
  const title = bookCard.querySelector('.book-card__title h2').textContent.toLowerCase()
  const author = bookCard.querySelector('.book-card__author h3').textContent.toLowerCase()
  const key = title + '_' + author
  delete myLibrary[key]
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
  const removeButton = document.querySelectorAll('.remove-button button')
  removeButton.forEach(button => {
    button.addEventListener('click', removeBook)
  })

  // add event listeners to read buttons (the updated ones)
  const readButton = document.querySelectorAll('.read-button')
  // whenever there is a change in the checkbox, toggle the read status
  readButton.forEach(button => {
    button.addEventListener('change', e => {
      const bookCard = e.target.parentElement.parentElement.parentElement // get parent element
      const title = bookCard.querySelector('.book-card__title h2').textContent.toLowerCase()
      const author = bookCard.querySelector('.book-card__author h3').textContent.toLowerCase()
      const key = title + '_' + author
      myLibrary[key].toggleRead()
    })
  }
  )
}

// add books to library
function addBookFromForm (e) {
  e.preventDefault()
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const totalPages = document.getElementById('total-pages').value
  const read = document.getElementById('read-button').value === 'read'
  const key = title.toLowerCase() + '_' + author.toLowerCase()

  // make sure the book doesn't already exist and also title, author and totalPages are not empty
  if (!title || !author || !totalPages) {
    alert('Please enter all the required fields')
    return
  } else if (myLibrary[key]) {
    alert('This book already exists in your library')
    return
  }

  const book = new Book(title, author, totalPages, read)
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
    if (event.target === form || event.target === addButton) {
      form.style.display = 'none'
      addButton.style.display = 'flex'
    }
  }
})

const submitButton = document.getElementById('submit')
submitButton.addEventListener('click', addBookFromForm)

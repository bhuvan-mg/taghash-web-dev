// script.js
const bookList = document.getElementById("book-list");

// Fetch books from the API and display them
async function fetchBooks() {
  try {
    const response = await fetch("/api/books");
    const books = await response.json();
    books.forEach(book => {
      const li = document.createElement("li");
      li.textContent = `${book.title} by ${book.author} - $${book.price}`;
      bookList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching books: ", error);
  }
}

fetchBooks();

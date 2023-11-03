const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "bookstore",
});

connection.connect(err => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

// Get all books
app.get("/api/books", (req, res) => {
  connection.query("SELECT * FROM books", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Get a specific book
app.get("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  connection.query("SELECT * FROM books WHERE id = ?", [bookId], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  });
});

// Add a new book
app.post("/api/books", (req, res) => {
  const { title, author, genre, price, availability } = req.body;
  connection.query("INSERT INTO books (title, author, genre, price, availability) VALUES (?, ?, ?, ?, ?)",
    [title, author, genre, price, availability],
    (error, results) => {
      if (error) throw error;
      res.status(201).json({ id: results.insertId, ...req.body });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

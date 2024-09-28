const express = require('express');
const public_users = express.Router();
let books = require("./booksdb.js");

// Task 10: Get the book list available in the shop
public_users.get('/', function (req, res) {
  try {
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Task 11: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  try {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details", error: error.message });
  }
});

// Task 12: Get book details based on Author
public_users.get('/author/:author', function (req, res) {
  try {
    const author = req.params.author.toLowerCase();
    const authorBooks = Object.values(books).filter(
      book => book.author.toLowerCase().includes(author)
    );
    if (authorBooks.length > 0) {
      res.status(200).json(authorBooks);
    } else {
      res.status(404).json({ message: "No books found for this author" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by author", error: error.message });
  }
});

// Task 13: Get book details based on Title
public_users.get('/title/:title', function (req, res) {
  try {
    const title = req.params.title.toLowerCase();
    const titleBooks = Object.values(books).filter(
      book => book.title.toLowerCase().includes(title)
    );
    if (titleBooks.length > 0) {
      res.status(200).json(titleBooks);
    } else {
      res.status(404).json({ message: "No books found with this title" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by title", error: error.message });
  }
});

module.exports.general = public_users;
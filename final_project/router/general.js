const express = require('express');
const axios = require('axios');  // Make sure this line is present
const public_users = express.Router();
let books = require("./booksdb.js");
function simulateApiCall(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data }), 100);
  });
}

// Task 10: Get the book list available in the shop using async/await with Axios
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ 
      message: "Error fetching books", 
      error: error.message 
    });
  }
});
// Task 11: Get book details based on ISBN using async/await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const response = await simulateApiCall(books[isbn]);
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details", error: error.message });
  }
});
// Task 12: Get book details based on Author using async/await with Axios
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author.toLowerCase();
    
    // Simulate API call by filtering local data
    const authorBooks = Object.values(books).filter(
      book => book.author.toLowerCase().includes(author)
    );
    
    // Simulate delay of an API call
    const response = await simulateApiCall(authorBooks);
    
    if (response.data.length > 0) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "No books found for this author" });
    }
  } catch (error) {
    console.error('Error fetching books by author:', error);
    res.status(500).json({ 
      message: "Error fetching books by author", 
      error: error.message 
    });
  }
});

// Task 13: Get book details based on Title
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title.toLowerCase();
    
    // Simulate API call by filtering local data
    const titleBooks = Object.values(books).filter(
      book => book.title.toLowerCase().includes(title)
    );
    
    // Simulate delay of an API call
    const response = await simulateApiCall(titleBooks);
    
    if (response.data.length > 0) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "No books found with this title" });
    }
  } catch (error) {
    console.error('Error fetching books by title:', error);
    res.status(500).json({ 
      message: "Error fetching books by title", 
      error: error.message 
    });
  }
});
module.exports.general = public_users;
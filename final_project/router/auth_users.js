const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = require("./credentianls.js");

const isValid = (username) => {
  return username && username.length > 0 && !users.find(user => user.username === username);
}

const authenticatedUser = (username, password) => {
  return users.find(user => user.username === username && user.password === password);
}

// Registration route
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username or already taken" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", username, password);
  console.log("Current users:", users);

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const user = authenticatedUser(username, password);
  console.log("Authenticated user:", user);

  if (user) {
    // Generate JWT token
    const token = jwt.sign(
      { username: user.username },
      'your_secret_key',
      { expiresIn: '1h' }
    );

    // Set token in session
    req.session.authorization = {
      accessToken: token
    };

    return res.status(200).json({ 
      message: "User successfully logged in",
      token: token
    });
  } else {
    return res.status(401).json({ message: "Invalid login credentials" });
  }
});

// ... (other routes remain the same)

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
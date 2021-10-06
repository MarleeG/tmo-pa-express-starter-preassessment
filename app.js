const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
let books = require("./books.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/health", (req, res) => {
  res.status(200).send("Don't panic.");
});

app.get("/api/books", (req, res) => {
  const sortedBooks = books.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

  res.status(200).json({ books: sortedBooks })

  // books.length > 0 ?
  //   res.status(200).json({ books: sortedBooks }) :
  //   res.status(200).json({ "message": "There aren't any books available in your library at this time." })
});

app.post("/api/books", (req, res) => {
  const book = { id: uuidv4(), ...req.body };

  books = [book, ...books];
  res.status(201).json(book);

  //    :
  //   res.status(500).json({ error: "An error has occured. Please ensure your book includes an author property in your json body. " });
});

app.delete("/api/books", (req, res) => {
  if (books.length > 0) books = [];
  res.status(204).end()
})


module.exports = app;
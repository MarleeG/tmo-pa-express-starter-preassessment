const express = require("express");
const app = express();
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
});

app.post("/api/books", (req, res) => {
  const book = { id: Date.now(), ...req.body };

  books = [book, ...books];
  res.status(201).json(book);
});

app.delete("/api/books", (req, res) => {
  if (books.length > 0) books = [];
  res.status(204).end()
})


module.exports = app;
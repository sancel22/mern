const asyncHandler = require("express-async-handler");

const Book = require("../model/Book");

// @desc  Get Books
// @route GET /api/books
// @access Private
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});

// @desc  Set Book
// @route POST /api/books
// @access Private
const setBook = asyncHandler(async (req, res) => {
  const { title = undefined, author = undefined } = req.body;

  // TODO: extract validation to validator function
  if (!title) {
    res.status(400);
    throw new Error("Please supply book title");
  }

  if (!author) {
    res.status(400);
    throw new Error("Please supply a author");
  }

  const newBook = await Book.create({ title, author });

  res.status(200).json(newBook);
});

// @desc  Update Book
// @route PUT /api/books/:id
// @access Private
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    req.status(400);
    throw new Error("Book not found!");
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBook);
});

// @desc  Delete Book
// @route DELETE /api/book/:id
// @access Private
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    req.status(400);
    throw new Error("Book not found!");
  }

  await book.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBooks,
  setBook,
  updateBook,
  deleteBook,
};
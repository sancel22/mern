const asyncHandler = require("express-async-handler");

// @desc  Get Books
// @route GET /api/books
// @access Private
const getBooks = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Books" });
});

// @desc  Set Book
// @route POST /api/books
// @access Private
const setBook = asyncHandler(async (req, res) => {
  // TODO: handle post data
  res.status(200).json({ message: "Set Books" });
});

// @desc  Update Book
// @route PUT /api/books/:id
// @access Private
const updateBook = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});

// @desc  Delete Book
// @route DELETE /api/book/:id
// @access Private
const deleteBook = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
  getBooks,
  setBook,
  updateBook,
  deleteBook,
};

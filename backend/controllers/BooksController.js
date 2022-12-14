const asyncHandler = require("express-async-handler");
const dayjs = require("dayjs");

const Book = require("../model/Book");
const User = require("../model/User");

// @desc  Get Books
// @route GET /api/books
// @access Private
const getBooks = asyncHandler(async (req, res) => {
  const min10 = dayjs().subtract(10, "minute");
  const user = await User.findById(req.user.id);
  let onlyMe = {
    created_by: req.user.id,
  };
  if (user.roles.map((role) => role.toUpperCase()).includes("VIEW ALL")) {
    onlyMe = {};
  }
  const query = Book.find(onlyMe);
  const reqQuery = Object.entries(req.query);
  if (reqQuery.length > 0) {
    const [target, value] = reqQuery[0];
    if (target === "new") {
      if (value === "1") {
        query.where("createdAt").gte(min10);
      } else {
        query.sort({ createdAt: "desc" });
      }
    }
    if (target === "old") {
      if (value === "1") {
        query.where("createdAt").lte(min10);
      } else {
        query.sort({ createdAt: "asc" });
      }
    }
  }
  const books = await query.exec();
  res.status(200).json(books);
});

// @desc  Set Book
// @route POST /api/books
// @access Private
const setBook = asyncHandler(async (req, res) => {
  const { title, author, published_year } = req.body;

  if (!title || !author) {
    res.status(400);
    throw new Error("Please add all book information");
  }

  const newBook = await Book.create({
    title,
    author,
    published_year,
    created_by: req.user.id,
  });

  res.status(200).json({ success: true, book: newBook });
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

  res.status(200).json({ success: true, updatedBook });
});

// @desc  Delete Book
// @route DELETE /api/books/:id
// @access Private
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    req.status(400);
    throw new Error("Book not found!");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (book.created_by.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await book.remove();

  res.status(200).json({ success: true, id: req.params.id });
});

module.exports = {
  getBooks,
  setBook,
  updateBook,
  deleteBook,
};

const express = require("express");
const router = express.Router();
const {
  getBooks,
  setBook,
  updateBook,
  deleteBook,
} = require("../controllers/BooksController");

router.route('/').get(getBooks).post(setBook)
router.route('/:id').delete(deleteBook).put(updateBook)

module.exports = router;

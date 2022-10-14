const express = require("express");
const router = express.Router();
const {
  getBooks,
  setBook,
  updateBook,
  deleteBook,
} = require("../controllers/BooksController");

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getBooks).post(protect, setBook);
router.route("/:id").delete(protect, deleteBook).put(protect, updateBook);

module.exports = router;

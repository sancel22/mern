const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    author: {
      type: String,
      required: [true, "Please add author"],
    },
    published_year: String,
  },
  {
    timestamps: true,
  }
);
mongoose.set('debug', true);
module.exports = mongoose.model("Book", bookSchema);

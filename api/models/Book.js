const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  read: Boolean,
});

const Book = model("Book", bookSchema);
module.exports = Book;

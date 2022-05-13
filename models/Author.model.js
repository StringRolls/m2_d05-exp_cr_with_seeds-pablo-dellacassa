const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    name: String,
    books: {type: [{ type: Schema.Types.ObjectId, ref: "Book" }], default: []},
  },
  {
    timestamps: true,
  }
);

const Author = model("Author", authorSchema);

module.exports = Author;

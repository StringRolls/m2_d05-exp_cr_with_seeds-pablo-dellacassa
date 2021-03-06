// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const router = express.Router();

// ********* require Book model in order to use it *********
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

// ****************************************************************************************
// GET route to display all the books
// ****************************************************************************************

router.get("/books", (req, res) => {
  Book.find()
  .populate("author")
    .then((allTheBooksFromDB) => {
      //console.log(allTheBooksFromDB);
      res.render("books-list", { books: allTheBooksFromDB });
    })
    .catch((err) =>
      console.log(`Err while getting the books from the  DB: ${err}`)
    );
});

router
  .route("/books/new")
  .get((req, res) => {
    Author.find().then((allTheAuthors) =>
      res.render("book-create", allTheAuthors)
    );
  })
  .post((req, res) => {
    const { title, description, author, rating } = req.body;
    console.log({ title, description, author, rating });

    Book.create({ title, description, author, rating })
      .then((newBook) => res.redirect(`/books/${newBook._id}`))
      .catch((err) => console.log(err));
  });


  router
  .route("/books/edit/:id")
  .get((req, res) => {
    const { id } = req.params;
    console.log("EDIT book ", id);
    Book.findById(id)
      .then((book) => res.render("book-edit", book))
      .catch((err) => console.log(err));
  })
  .post((req, res) => {
    const { id } = req.params;
    const { title, description, author, rating } = req.body;
    console.log("EDIT book ", id);
    Book.findByIdAndUpdate(
      id,
      { title, description, author, rating },
      { new: true }
    )
      .then((editedBook) => res.redirect(`/books/${editedBook._id}`))
      .catch((err) => console.log(err));
  });

// ****************************************************************************************
// GET route for displaying the book details page
// ****************************************************************************************

router.get("/books/:id", (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .then((foundBook) => {
      // console.log('Did I find a book?', foundBook);
      res.render("book-details", foundBook);
    })
    .catch((err) =>
      console.log(`Err while getting the specific book from the  DB: ${err}`)
    );
});

module.exports = router;

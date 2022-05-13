// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const router = express.Router();

// ********* require Book model in order to use it *********
const Author = require("../models/Author.model");

// ****************************************************************************************
// GET route to display all the books
// ****************************************************************************************

router.get("/authors", (req, res) => {
  Author.find()
    .then((allTheAuthorsFromDB) => {
      //console.log(allTheBooksFromDB);
      res.render("authors-list", { authors: allTheAuthorsFromDB });
    })
    .catch((err) =>
      console.log(`Err while getting the authors from the  DB: ${err}`)
    );
});

router
  .route("/authors/new")
  .get((req, res) => res.render("author-create"))
  .post((req, res) => {
    const { name } = req.body;
    Author.create({ name })
      .then((newAuthor) => res.redirect(`/authors/${newAuthor._id}`))
      .catch((err) => console.log(err));
  });

router
  .route("/authors/edit/:id")
  .get((req, res) => {
    const { id } = req.params;
    Author.findById(id)
      .then((author) => res.render("author-edit", author))
      .catch((err) => console.log(err));
  })
  .post((req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    Author.findByIdAndUpdate(id, { name }, { new: true })
      .then((editedAuthor) => res.redirect(`/authors/${editedAuthor._id}`))
      .catch((err) => console.log(err));
  });

// ****************************************************************************************
// GET route for displaying the book details page
// ****************************************************************************************

router.get("/authors/:id", (req, res) => {
  const { id } = req.params;
  Author.findById(id)
  .populate("books")
    .then((foundAuthor) => {
      // console.log('Did I find a book?', foundBook);
      res.render("author-details", foundAuthor);
    })
    .catch((err) =>
      console.log(`Err while getting the specific book from the  DB: ${err}`)
    );
});
module.exports = router;
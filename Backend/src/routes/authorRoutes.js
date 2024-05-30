const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authors")
// const authorRoutes = requires("./routes/authorRoutes");

// CREATE authors
router.post("/", (req, res) => {
    authorController.createAuthor(req,res);
    // res.status(200).json({ message: "Create new author!" });
});

// READ authors
router.get("/", (req, res) => {
    authorController.getAuthors(req,res);
    // res.status(200).json({ message: "Return all authors!", data:[]})
});

// READ authors by id
router.get("/:id", (req, res) => {
    authorController.getAuthorById(req,res);
});

// UPDATE 
router.put("/:id", (req,res) => {
    authorController.updateAuthorById(req,res);
});

// DELETE
router.put("/:id", (req,res) => {
    authorController.deleteAuthorById(req,res);
});

module.exports = router;
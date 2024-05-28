const express = require('express');
const router = express.Router();

const blogController = require("../controllers/blogs")

// CREATE blogs
router.post("/", (req, res) => {
    res.send("Blog has been created!");
    blogController.createBlog(req,res);
    // res.status(200).json({ message: "Create new blog!" });
});

// READ blogs
router.get("/", (req, res) => {
    res.send("Retrieving all blogs!");
    blogController.getBlogs(req,res);
    // res.status(200).json({ message: "Return all blogs!", data:[]})
});

// READ blogs by id
router.get("/:id", (req, res) => {
    res.send("Retrieving blogs by a category id!");
    blogController.getBlogById(req,res);
});

// UPDATE 
router.put("/:id", (req,res) => {
    blogController.updateBlogById(req,res);
});

// DELETE
router.put("/:id", (req,res) => {
    blogController.deleteBlogById(req,res);
});

module.exports = router;
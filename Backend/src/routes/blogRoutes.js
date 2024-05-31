const express = require('express');
const router = express.Router();

const blogController = require("../controllers/blogs")

// CREATE blogs
router.post("/", (req, res) => {
    blogController.createBlog(req,res);
    // res.status(200).json({ message: "Create new blog!" });
});

// READ blogs
router.get("/", (req, res) => {
    blogController.getBlogs(req,res);
    // res.status(200).json({ message: "Return all blogs!", data:[]})
});

// READ blogs by id
router.get("/:id", (req, res) => {
    blogController.getBlogById(req,res);
});

// READ blogs by category id
router.get("/category/:id", (req, res) =>{
    blogController.getBlogsByCategoryId(req,res);
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
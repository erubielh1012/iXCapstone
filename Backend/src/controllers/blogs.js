const Blog = require("../models/Blog");

// this is all the routes code for blogs
const createBlog = async (req, res) => {
    try {
        const blog = new Blog({
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            categories: req.body.categories,
            author: req.body.author,
            content: req.body.content,
        });

        await blog.save()
        
        res.status(200).json({ 
            message: "Created new blog!", 
            data: blog });
    } catch (error) { 
        res.status(500).json({
            message: error.message,
            data: [],
        });
     }
  };
  
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
    
        res.status(200).json({ 
            message: "Return all blogs!", 
            data: blogs });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        res.status(200).json({ 
            message: "Return blog by the BLOG ID!", 
            data: blog });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

// not sure how this one works
const getBlogsByCategoryId = async (req, res) => {
    try {
        const blogs = await Blog.findById(req.params.id);
        
        res.status(200).json({ 
            message: "Return blog by the category ID!", 
            data: blogs });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

const updateBlogById = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
    
        if (blog) {
            blog.image = req.body.image || blog.image;
            blog.title = req.body.title || blog.title;
            blog.description = req.body.description || blog.description;
            blog.categories = req.body.categories || blog.categories;
            blog.author = req.body.author || blog.author;
            blog.content = req.body.content || blog.content;
        };
    
        const updatedBlog = await blog.save()
        
        res.status(200).json({ 
            message: "Updated blog by ID!", 
            data: updatedBlog });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: []
        });
    }
};

const deleteBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndRemove(req.params.id);
    
        if (blog) {
            return res.status(200).json({ message: "Blog deleted!"})
        }
        
        res.status(200).json({ 
            message: "Delete blog by ID!", 
            data: [] });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

module.exports = {
getBlogs,
// getBlog,
getBlogsByCategoryId,
getBlogById,
createBlog,
updateBlogById,
deleteBlogById,
  };


  
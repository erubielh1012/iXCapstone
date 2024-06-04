const Blog = require("../models/Blog");

// this is all the routes code for blogs
const createBlog = async (req, res) => {
    try {
        const categoryIds = req?.body?.categories.map((x) => x.id);

        const blog = new Blog({
            author: req?.body?.author,
            image: req?.body?.image,
            title: req?.body?.title,
            categories: categoryIds,
            description: req?.body?.description,
            content: req?.body?.content,
        });

        const newBlog = await blog.save();
        const blogRes = await Blog.findById(newBlog._id).populate({
            path: "categories",
        });
        
        res.status(200).json({ 
            message: "Created new blog!", 
            data: blogRes });
    } catch (error) { 
        res.status(500).json({
            message: error.message,
            data: [],
        });
     }
  };
  
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate({ path: "categories" });
    
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
        console.log(req.params.id);
        const blog = await Blog.findById(req.params.id).populate({
            path: "categoryIds",
        });;
        
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
        console.log("We want to get the blogs with catId of", req.params.id);
        let filter = {};
        if (req.params.id != "null" && req.params.id != "undefined"){
            filter = {categories: req.params.id};
        }

        console.log("The filter is created:", filter);

        const blogs = await Blog.find(filter).populate({ path: "categories" });
        
        console.log("Filter applied to blogs:", blogs);

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
        const blog = await Blog.findById(req.params.id).populate({
            path: "categoryIds",
        });;
    
        if (blog) {
            const categoryIds = req?.body?.categories.map((x) => x.id);
            blog.image = req?.body?.image || blog.image;
            blog.title = req?.body?.title || blog.title;
            blog.description = req?.body?.description || blog.description;
            blog.categories = categoryIds ? categoryIds : blog.categories;
            blog.author = req?.body?.author || blog.author;
            blog.content = req.body.content ? req.body.content : blog.content;
            const updatedBlog = await blog.save();
            const blogRes = await updatedBlog.populate({
                path: "categories",
            });
            res.status(200).json({ 
                message: "Updated blog by ID!", 
                data: blogRes });
        } else {
            res.status(404).json({ message: "Blog not found!", data: [] });
        };
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
            return res.status(200).json({ message: "Blog deleted!", id: req.params.id})
        } else {
            return res.status(404).json({ message: "Blog not found!" });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
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
  
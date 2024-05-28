// this is all the routes code for blogs
const createBlog = (req, res) => {
    res.status(200).json({ 
        message: "Create new blog!", 
        data: [] });
  };
  
const getBlogs = (req, res) => {
    res.status(200).json({ 
        message: "Return all blogs!", 
        data: [] });
};

const getBlog = (req, res) => {
    res.status(200).json({ 
        message: "Return blog by ID!", 
        data: [] });
};

const getBlogByCategoryId = (req, res) => {
    res.status(200).json({ 
        message: "Return blog by the category ID!", 
        data: [] });
};

const updateBlogById = (req, res) => {
    res.status(200).json({ 
        message: "Update blog by ID!", 
        data: [] });
};

const deleteBlogById = (req, res) => {
    res.status(200).json({ 
        message: "Delete blog by ID!", 
        data: [] });
};

module.exports = {
getBlogs,
getBlog,
createBlog,
updateBlogById,
deleteBlogById,
getBlogByCategoryId,
  };
const Category = require("../models/Category");

const createCategory = async (req, res) => {
    try {
        const category = new Category({
            title: req.body.title,
            description: req.body.description,
            color: req.body.color,
        });
        const newCategory = await category.save()
        const categoryRes = await Category.findById(newCategory._id);
        res.status(200).json({
            message: "Created new category!",
            data: categoryRes 
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const category = await Category.find();
    
        res.status(200).json({ 
            message: "Return all categories!", 
            data: category });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};


// in the vuepres Byron does not have the await category.findbyid function. Does it need one?
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
    
        res.status(200).json({ 
            message: "Return category by its ID!", 
            data: category });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
    
        if (category) {
            category.title = req.body.title || category.title;
            category.description = req.body.description || category.description;
            category.color = req.body.color || category.color;
            const updatedCategory = await category.save()
            res.status(200).json({ 
                message: "Updated category by ID!", 
                // headers: req.headers,
                data: updatedCategory });
        } else {
            res.status(404).json({ message: "Category not found!", data: [] });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const categoryDB = await Category.findById(req.params.id);
    
        if(!categoryDB){
            res.status(400).json({ 
                message: "Cannot delete category with existing blogs!",
            });
        }
        const category = await Category.findByIdAndDelete(req.params.id);
        if (category){
            res.status(200).json({ 
                message: "Category deleted!", 
                id: req.params.id });
        } else {
            res.status(404).json({ message: "Category not found!", data: [] });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
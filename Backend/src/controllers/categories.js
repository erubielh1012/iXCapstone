const Category = require("../models/Category");

const createCategory = async (req, res) => {
    try {
        const category = new Category({
            title: req.body.title,
            description: req.body.description,
            color: req.body.color,
        });
        await category.save()
        res.status(200).json({
            message: "Created new category!",
            data: category 
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
            category.title = req.category.title || category.title;
            category.description = req.category.description || category.description;
            category.color = req.category.color || category.color;
        };

        const updatedCategory = await category.save()

        res.status(200).json({ 
            message: "Updated category by ID!", 
            data: updatedCategory });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
    
        if(category){
            return res.status(200).json({ 
                message: "Category deleted!",
            })
        }
        res.status(200).json({ 
            message: "Return category by its ID!", 
            data: [] });
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
const express = require('express');
const router = express.Router();

const catController = require("../controllers/categories")

const { protect } = require("../middleware/authMiddleware");

// CREATE Categories
router.post("/", protect, (req, res) => {
    catController.createCategory(req,res);
    // res.status(200).json({ message: "Create new Category!" });
});

// READ Categories
router.get("/", (req, res) => {
    catController.getCategories(req,res);
    // res.status(200).json({ message: "Return all Categories!", data:[]})
});

// READ Categories by id
router.get("/:id", (req, res) => {
    catController.getCategoryById(req,res);
});

// UPDATE 
router.put("/:id", protect, (req,res) => {
    catController.updateCategory(req,res);
});

// DELETE
router.delete("/:id", protect, (req,res) => {
    catController.deleteCategory(req,res);
});

module.exports = router;
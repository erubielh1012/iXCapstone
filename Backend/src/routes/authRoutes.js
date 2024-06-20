const express = require('express');
const router = express.Router();

const authController = require("../controllers/auth")

const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multer");

// CREATE authors
router.post("/login", (req, res) => {
    authController.login(req,res);
});

router.post("/register", (req,res) => {
    authController.register(req,res);
});

// GET author information
router.get("/:id", (req,res) =>{
    authController.getAuthorInfo(req,res);
});

// update user
router.put("/user/:id", protect, upload.single("image"), (req,res) => {
    authController.updateUser(req,res);
});

module.exports = router;

// {
//   "firstName": "Byron",
//   "lastName": "de Villiers",
//   "email": "byron@mail.com",
//   "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   "password": "qwerty"
// }
const Author = require("../models/Author");

// this is all the routes code for blogs
const createAuthor = async (req, res) => {
    try {
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,
            image: req.body.image,
        });
        await author.save()
        res.status(200).json({ 
            message: "Created new author!", 
            data: author });
    } catch (error) { 
        res.status(500).json({
            message: error.message,
            data: [],
        });
     }
  };
  
const getAuthors = async (req, res) => {
    try {
        const author = await Author.find();
    
        res.status(200).json({ 
            message: "Return all author!", 
            data: author });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        
        res.status(200).json({ 
            message: "Return author by the AUTHOR ID!", 
            data: author });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

const updateAuthorById = async (req, res) => {
    try{
        const author = await Author.findById(req.params.id);
    
        if (blog) {
            author.firstName = req.body.firstName || author.firstName;
            author.lastName = req.body.lastName || author.lastName;
            author.bio = req.body.bio || author.bio;
            author.image = req.body.image || author.image;
        };
    
        const updatedAuthor = await author.save()
        
        res.status(200).json({ 
            message: "Updated author by ID!", 
            data: updatedAuthor });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: []
        });
    }
};

const deleteAuthorById = async (req, res) => {
    try {
        const author = await Author.findByIdAndRemove(req.params.id);
    
        if (author) {
            return res.status(200).json({ message: "Author deleted!"})
        }
        
        res.status(200).json({ 
            message: "Delete author by ID!", 
            data: [] });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

module.exports = {
getAuthors,
// getBlog,
getAuthorById,
createAuthor,
updateAuthorById,
deleteAuthorById,
  };


  
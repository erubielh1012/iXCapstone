const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        // this lets the system know how long to let the user be verified before expiration
        // expiresIn: "1d",
    });
};

const register = async (req, res) => {  
    try {
      const { firstName, lastName, email, bio, password } = req.body;
      //check payload
      if (!firstName || !lastName || !email || !bio || !password) {
        res.status(400).json({ message: "All fields are required", data: [] });
        return;
      }
      // check if email already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400).json({ message: "User already exists"});
        return;
      }

        // hash password. salt is generating a random sequence of characters of length 10
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create new user
      const user = new User({
        firstName,
        lastName,
        email,
        bio,
        password: hashedPassword,
      });
      const newUser = await user.save();
      let resUser = newUser.toJSON();
      resUser.token = generateToken(resUser.id);
    //   this is a security measure for anyone trying to spoof into the payloads being sent 
      delete resUser.password;
      res.status(201).json({ message: "New user created!", data: resUser });
    } catch (error) {
      res.status(500).json({ message: error.message, data: [] });
    }
  };

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check payload
        if (!email || !password) {
        res.status(400).json({ message: "All fields are required"});
        return;
        }
        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
        res.status(400).json({ message: "User does not exist" });
        return;
        }
        // check hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
        res.status(400).json({ message: "Invalid credentials", data: [] });
        return;
        }

        let resUser = user.toJSON();
        resUser.token = generateToken(resUser.id);

        delete resUser.password;
        res.status(200).json({ message: "Login successful!", data: resUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const getAuthorInfo = async(req,res) => {
    try {
        const author = await User.findById(req.params.id, "firstName lastName email bio image");
    
        res.status(200).json({ 
            message: "Return Author Info!", 
            data: author });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

const updateUser = async (req,res) => {
  try {
    const author = await User.findById(req.params.id);
    
    if (author) {
      author.firstName = req?.body?.firstName || author.firstName;
      author.lastName = req?.body?.lastName || author.lastName;
      author.bio = req?.body?.bio || author.bio;
      author.email = req?.body?.email || author.email;
      // author.image = req.body.image || author.image;
      (author.image = req?.file?.path
        ? req?.protocol + "://" + req?.headers?.host + "/" + req.file.path
        : author.image);
      author.password = author.password;

      const updatedUser = await author.save()
      
      res.status(200).json({ 
          message: "Updated author ID!", 
          // headers: req.headers,
          data: updatedUser });
    } else {
        res.status(404).json({ message: "User not found!", data: [] });
    }
  } catch (error) {
      res.status(500).json({
          message: error.message,
          data: [],
      });
  }
}

  
  module.exports = {
    register,
    login,
    getAuthorInfo,
    updateUser,
  };


const jwt = require("jsonwebtoken");
const User = require("../models/User");

// next calls the next middleware in our root, the next object
const protect = async (req, res, next) => {
  let token;

  // console.log("Is in the protect header")
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    // bearer operation strategy in Postman
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404)
      .json({ 
        message: `No user found with this id. Token is ${token}, Decoded is ${decoded}, and secret is ${process.env.JWT_SECRET}`, 
        data: decoded });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not authorized to access this route" });
  }
};

module.exports = { protect };

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTc4NzE5MTh9.oAWHVMfjT-mxpIgwQOjT1rd03vOPtOtGnNFnd9uWfeU
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWVlY2RkMzUxYjZhMWJkOWQyN2M2ZSIsImlhdCI6MTcxNzUwNTE5Mn0.68XFGliTpVOtpRJRwXDPuVbjfDpQHLiUy-X_6YETYl0
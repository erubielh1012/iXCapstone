const express = require("express");
const cors = require("cors");
require("dotenv").config()

const port = process.env.PORT || 8000;

const connectDB = require("./database/db");
connectDB();

const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Cross-origin resource sharing is a mechanism that allows a web page to access restricted resources from a server on a domain different than the domain that served the web page.
// Enabling CORS for any unknown origin
app.use(cors());

app.use(express.json());

app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

// app.get('/', (req, res) => {
//     res.send("Sawubona, unjani!");
// });

app.listen(port, () => {
    console.log(`IX blogging app listening on port ${port}`)
});
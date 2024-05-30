const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            require: true,
        },
        color: {
            type: String,
            required: true,
        },
    },
);

module.exports = mongoose.model("Category", categorySchema);
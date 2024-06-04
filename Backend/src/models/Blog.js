const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: "https://storage.googleapis.com/ix-blog-app/default.jpeg",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "Category"
    },
    author: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
  },
  { timeStamp: true }
);

// Add a toJSON method to the schema to control the output of blog instances
blogSchema.method("toJSON", function () {
  const { __v, _id, categories, ...object } = this.toObject();
  object.id = _id;

  object.categories = categories.map((category) => {
    return {
      id: category._id,
      title: category.title,
      description: category.description,
      color: category.color,
    };
  });

  // Ensure author is included in the returned object
  if (this.author) {
    object.author = this.author;
  }

  return object;
});


module.exports = mongoose.model("Blog", blogSchema);
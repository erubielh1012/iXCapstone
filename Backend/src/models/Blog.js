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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    content: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

// Add a toJSON method to the schema to control the output of blog instances
blogSchema.method("toJSON", function () {
  const { __v, _id, categories, author, ...object } = this.toObject();
  object.id = _id;

  object.categories = categories.map((category) => {
    return {
      id: category._id,
      title: category.title,
      description: category.description,
      color: category.color,
    };
  });

  // Add author details to the blog object
  if (author && author._id) {
    object.author = {
      id: author._id,
      firstName: author.firstName,
      lastName: author.lastName,
      email: author.email,
      image: author.image,
      bio: author.bio,
    }
  }
  // object.author = author._id

  return object;
});


module.exports = mongoose.model("Blog", blogSchema);

/*

{
    "image": "https://theforage.wpengine.com/wp-content/uploads/2022/12/what-is-cybersecurity-1536x947.jpg",
    "title": "The Best and Most Used Frameworks in Cybersecurity",
    "description": "This article contain the two top frameworks on how to have a sustainable plan for cybersecurity to make sure you're company is secure and has implemented the guidelines necessary in case of an attack. These frameworks include NIST CSF and the OWASP Security Principles",
    "categories": [],
    "author": {
        "firstName": "Bryon",
        "lastName": "de Villiers",
        "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "image": "some-image"
    }
}

*/

/*
  {
    "image": "https://earimediaprodweb.azurewebsites.net/Api/v1/Multimedia/5f603c36-00c3-4c97-aab1-482a17146b91/Rendition/low-res/Content/Public",
    "title": "Around the World",
    "description": "We are going to navigate everywhere",
    "categories": [],
    "author": {
        "firstName": "Bryon",
        "lastName": "de Villiers",
        "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "image": "some-image"
    }
  }
*/

/*
{
  "image": "https://earimediaprodweb.azurewebsites.net/Api/v1/Multimedia/5f603c36-00c3-4c97-aab1-482a17146b91/Rendition/low-res/Content/Public",
    "title": "Around the World",
    "description": "We are going to navigate everywhere",
    "categories": [],
    "author": {
        "firstName": "Bryon",
        "lastName": "de Villiers",
        "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "image": "some-image"
    }
}
*/
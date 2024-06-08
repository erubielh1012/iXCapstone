import React from "react";
import BlogItem from "../BlogItem";
import PropTypes from "prop-types";
import "./index.css";

export default function BlogList({ blogPosts, setEditBlog, setDeleteBlog }) {
  if (!blogPosts && !blogPosts?.length) {
    return null;
  }

  return (
    <div className="blog-posts">
      {blogPosts.map((blogPost, index) => {
        return (
            <BlogItem
              key={index} 
              index={index}
              blogPost={blogPost}
              imageOrientation={"top"}
              setEditBlog={setEditBlog}
              setDeleteBlog={setDeleteBlog}
            />
        );
      })}
    </div>
  );
}

BlogList.propTypes = {
  blogPosts: PropTypes.array.isRequired,
  setEditBlog: PropTypes.func,
  setDeleteBlog: PropTypes.func,
}
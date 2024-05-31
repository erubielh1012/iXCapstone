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
            <div
              key={index} 
              style={{width: "100%"}}
            >
            <BlogItem
              index={index}
              blogPost={blogPost}
              // setBlog={() => {}}
              imageOrientation={"top"}
              setEditBlog={setEditBlog}
              setDeleteBlog={setDeleteBlog}
            />
            </div>
        );
      })}
    </div>
  );
}

  //   <div className="d-flex">
  //           {blogs.map((blog, index) => {
  //                   <BlogItem
  //               key={index}
  //                   index={index}
  //                   blogsPost={blog}
  //                   setBlog={() => {}}
  //                   imageOrientation={"top"}
  //                   />;
  //           })}
  //   </div>

  // );

BlogList.propTypes = {
  blogPosts: PropTypes.array.isRequired,
  setEditBlog: PropTypes.func,
  setDeleteBlog: PropTypes.func,
}
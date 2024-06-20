import React from "react";
import BlogItem from "../BlogItem";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./index.css";

import EditButtons from "../EditButtons";

import {
  setDeleteBlog,
  setEditBlog,
} from "../../features/blogSlice";

export default function BlogList({ blogPosts }) {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const nav = useNavigate();

  if (!blogPosts && !blogPosts?.length) {
    return null;
  }

  const onBlogEdit = (blog) => {
    dispatch(setEditBlog(blog));
  };

  const onBlogDelete = (blog) => {
    dispatch(setDeleteBlog(blog));
  };

  const EditButtonsContainer = (blogPost) => {
    return (
      <EditButtons
        onEdit={() => onBlogEdit(blogPost)}
        onDelete={() => onBlogDelete(blogPost)}
        onNavigate={() => nav("/blog/" + blogPost.id)}
        inBlogs={true}
      />
    )
  };

  return (
    <div className="blog-list">
      {blogPosts.map((blogPost, index) => {
        return (
          <div>
          <div className="card">
            <BlogItem
              key={index} 
              index={index}
              blogPost={blogPost}
              imageOrientation={"top"}
              // theStuff={( user?.id === blogPost.author.id ) ? EditButtonsContainer(blogPost) : null }
            />
            {( user?.id === blogPost.author.id ) ? EditButtonsContainer(blogPost) : null }
          </div>
          </div>
        );
      })}
    </div>
  );
}

BlogList.propTypes = {
  blogPosts: PropTypes.array.isRequired,
  setBlogEdit: PropTypes.func,
  setBlogDelete: PropTypes.func,
}
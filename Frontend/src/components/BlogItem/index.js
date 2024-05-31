import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import BlogItemText from "../BlogItemText";
import EditButtons from "../EditButtons";

import "../../App.css";
import "./index.css";

export default function BlogItem({
    index,
    blogPost,
    // setBlog,
    imageOrientation,
    setEditBlog,
    setDeleteBlog,
}) {

  const EditButtonsContainer = () => {
    <EditButtons
      onEdit={() => setEditBlog(blogPost)}
      onDelete={() => setDeleteBlog(blogPost)}
    />
  };

  const nav = useNavigate();

  // const navigateToBlog()=>{
  // }

    if (imageOrientation === "top") {
        return (
          <div
            key={index}
            className="card-1"
            // onClick={() => nav("/blogs/" + blogPost.id)}
            to={"/blog/" + blogPost.id}
          >
            <img src={blogPost.image} className="card-img-top" alt="..." />
            <div className="card-text-bottom">
              <BlogItemText
                blogPost={blogPost}
                headerFontSize="20px"
              ></BlogItemText>
              <EditButtonsContainer />
            </div>
          </div>
        );
    } else {
        return (
          <div
            key={index}
            className="card-2"
            onClick={() => nav("/blogs/" + blogPost.id)}
          >
            <img src={blogPost.image} className="card-img-left" alt="..." />
            <div className="card-text-right">
              <BlogItemText
                blogPost={blogPost}
                headerFontSize="20px"
              ></BlogItemText>
            </div>
            <EditButtonsContainer />
          </div>
        );
      }
}
BlogItem.propTypes = {
  index: PropTypes.number.isRequired,
  blogPost: PropTypes.object.isRequired,
  imageOrientation: PropTypes.string,
}
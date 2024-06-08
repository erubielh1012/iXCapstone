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
    imageOrientation,
    setBlogEdit,
    setBlogDelete,
}) {

    const user = JSON.parse(localStorage.getItem("user"));
    
    const nav = useNavigate();

    const navToBlog = () => {
      if (!setBlogEdit && !setBlogDelete) {
        nav(`/blog/${blogPost.id}`);
      }
    };

    const EditButtonsContainer = () => {
      <EditButtons
        onEdit={() => setBlogEdit(blogPost)}
        onDelete={() => setBlogDelete(blogPost)}
        navToBlog={() => navigate("/blog/" + blogPost.id)}
      />
    };


    if (imageOrientation === "top") {
        return (
          <div
            key={index}
            className="card-1 w-100"
            // to={"/blog/" + blogPost.id}
            onClick={(navToBlog)}
          >
            <img src={blogPost.image} className="card-img-top" alt="..." />
            <div className="card-text-bottom">
              <BlogItemText
                blogPost={blogPost}
                headerFontSize="20px"/>
                 <EditButtonsContainer/>
            </div>
          </div>
        );
    } else {
        return (
          <div
            key={index}
            className="card-2"
            onClick={navToBlog}
          >
            <img src={blogPost.image} className="card-img-left" alt="..." />
            <div className="card-text-right">
              <BlogItemText
                blogPost={blogPost}
                headerFontSize="20px" />
                < EditButtonsContainer />
            </div>
          </div>
        );
      }
  }
BlogItem.propTypes = {
  index: PropTypes.number.isRequired,
  blogPost: PropTypes.object.isRequired,
  imageOrientation: PropTypes.string,
}
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import BlogItemText from "../BlogItemText";
import EditButtons from "../EditButtons";

import "../../App.css";
import "./index.css";

export default function BlogItem({
    index,
    blogPost,
    imageOrientation,
    theStuff
}) {

    const user = JSON.parse(localStorage.getItem("user"));
    
    const nav = useNavigate();

    const navToBlog = () => {
      // if ((!setEditBlog && !setDeleteBlog)) {
        nav(`/blog/${blogPost.id}`);
      // }
    };


    if (imageOrientation === "top") {
        return (
          <>
          <div
            key={index}
            className="card-1 rounded"
            onClick={() => nav(`/blog/${blogPost.id}`)}
          >
            <img src={blogPost.image} className="card-img-top" alt="..." />
            <div className="card-text-bottom">
              <BlogItemText blogPost={blogPost} />
            </div>
            {/* <div className="" style={{ border: "blue 2px solid"}}>
              {(user?.id === blogPost.author.id) && setEditBlog && setDeleteBlog ? <EditButtonsContainer /> : null}
              {theStuff}
            </div> */}
          </div>
            </>
        );
    } else {
        return (
          <div
            key={index}
            className="card-2"
            style={{borderRadius: "40px 0 40px 0"}}
            onClick={() => nav(`/blog/${blogPost.id}`)}
          >
            <img src={blogPost.image} className="card-img-left" alt="..." />
            <div className="card-text-right">
              {/* {(user?.id === blogPost.author.id) && setEditBlog && setDeleteBlog ? <EditButtonsContainer /> : null} */}
              <BlogItemText blogPost={blogPost} />
            </div>
          </div>
        );
      }
  }
BlogItem.propTypes = {
  index: PropTypes.number.isRequired,
  blogPost: PropTypes.object.isRequired,
  imageOrientation: PropTypes.string,
  setEditBlog: PropTypes.func, 
  setBlogDelete: PropTypes.func
}
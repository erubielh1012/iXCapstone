import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./index.css";

import EditButtons from "../EditButtons";

export default function CategoryList({ categories, onEdit, onDelete }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const nav = useNavigate();

  if (!categories || !categories?.length) {
    return null;
  }

  return (
    <div className="container category-list mb-5">
      {categories.map((category) => {
        return (
          <div
            key={category.id}
            className="card rounded"
            style={{border: "none"}}
            // to={`/blogs/` + category.id}
            onClick={() => {
              if (user && onEdit && onDelete) return;
              nav("/blogs/"+category.id);
            }}
          >
            <div
              className="card-body rounded-top"
              style={{
                backgroundColor: category.color + "33",
                position: "relative",
                paddingBottom: "0",
                // zIndex: 0,
              }}
            >
              <h5 className="card-title">{category.title}</h5>
              {user && user.token && onEdit && onDelete && (
                <EditButtons 
                  onEdit={()=>{
                    onEdit(category);
                  }} 
                  onDelete={()=>{
                    onDelete(category);
                  }} 
                  onNavigate={() => nav("/blogs/" + category.id)}
                  inBlogs={false}
                />
              )}
            </div>
            <div className="card-body">
              <p className="card-text">
                {category?.description?.substring(0, 100)} ...
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}
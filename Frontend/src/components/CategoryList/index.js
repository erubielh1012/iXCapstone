import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./index.css";

import EditButtons from "../EditButtons";

import { setEditCategory, setDeleteCategory } from "../../features/categoriesSlice";

export default function CategoryList({ categories, isHome }) {

  const dispatch = useDispatch();

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
          >
            <div onClick={() => nav("/blogs/" + category.id)}>
              <div
                className="card-body rounded-top p-3"
                style={{
                  backgroundColor: category.color + "33",
                  position: "relative",
                }}
              >
                <h5 className="card-title">{category.title}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                  {category?.description?.substring(0, 100)} ...
                </p>
              </div>
            </div>

              {user && user.token && !isHome && (
                <EditButtons 
                  onEdit={()=> dispatch(setEditCategory(category))} 
                  onDelete={()=> dispatch(setDeleteCategory(category))} 
                  onNavigate={() => nav("/blogs/" + category.id)}
                  inBlogs={false}
                />
              )}
          </div>
        );
      })}
    </div>
  );
}
CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
}
import React from "react";
import PropTypes from "prop-types";

import "./index.css";

export default function BlogCategoryList({ categories }) {
  return (
    <div className="category-list">
      {categories.map((category) => {
        return (
          <button
            key={category.id}
            className="card"
            style={{ borderRadius: "0px", border: "none" }}
            onClick={() => {
              console.log("TODO: Navigate to categories page");
            }}
          >
            <div
              className="card-body w-100"
              style={{
                // --bs-text-opacity: 1,
                color: category.color ,
                // colorAdjust: 
                position: "relative",
                zIndex: 0,
              }}
            >
              <h5 className="card-title text-opacity-75 fs-6">{category.title}</h5>
            </div>
          </button>
        );
      })}
    </div>
  );
}
BlogCategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
}
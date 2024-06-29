import React from "react";

import PropTypes from "prop-types";

import "./index.css";

export default function Categories({ categories, removeCategory }) {
  if (!categories && !categories?.length) return null;
  return (
    <div className="flex-wrap">
      {categories.map((category, index) => {
        return (
          <p
            key={index}
            className="category-tag"
            style={{
              color: category.color,
              backgroundColor: category.color + "30",
            }}
            onClick={() => removeCategory ? removeCategory(category) : null}
          >
            {category.title}
          </p>
        );
      })}
    </div>
  );
}

Categories.prototype = {
  categories: PropTypes.array.isRequired,
};
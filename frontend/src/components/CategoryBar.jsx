import React from "react";
import "./CategoryBar.css";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Programming",
  "News",
  "Sports",
  "Education",
];

const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={
            selectedCategory === category
              ? "category-btn active"
              : "category-btn"
          }
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
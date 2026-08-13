import React from "react";
import "./CategoryBar.css";

// List of available video categories
const categories = [
  "All",
  "Music",
  "Gaming",
  "Programming",
  "News",
  "Sports",
  "Education",
];

// CategoryBar displays category buttons
// and allows the user to select a category
const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          // Add "active" class when the category is selected
          className={
            selectedCategory === category
              ? "category-btn active"
              : "category-btn"
          }
          // Update the selected category when clicked
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
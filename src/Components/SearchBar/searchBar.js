import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search restaurants..."
        className="Search-bar"
      ></input>
    </div>
  );
};

export default SearchBar;

import React, { useState } from "react";
import "./SearchBar.css";
// import { inspect } from "util";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    onSearch(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleBlur = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search restaurants by name..."
        className="Search-bar"
        value={searchQuery}
        onChange={handleInputChange}
        onBlur={handleBlur}
      ></input>
    </div>
  );
};

export default SearchBar;

import React from "react";
import FilterButtonWithDropdown from "./filterButtonWithDropdown";
import "./filterButton.scss";

const FiltersBar = () => {
  return (
    <div>
      <form className="Filters-bar" action="">
        <FilterButtonWithDropdown
          filter="Cuisine"
          options={[
            "Mexican",
            "Pizza",
            "Italian",
            "Sushi",
            "Chinese",
            "Breakfast",
            "Just Drinks",
          ]}
        />
        <FilterButtonWithDropdown
          filter="Location"
          options={[
            "Lakeview",
            "River North",
            "West Loop",
            "Wicker Park",
            "Lincoln Park",
            "Old Town",
          ]}
        />
        <FilterButtonWithDropdown
          filter="Price"
          options={["$", "$$", "$$$", "$$$$"]}
        />
      </form>
    </div>
  );
};

export default FiltersBar;

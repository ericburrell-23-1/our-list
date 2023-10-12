import React, { useState } from "react";
import FilterButtonWithDropdown from "./FilterButtonWithDropdown";
import "./FilterButton.scss";
const { CUISINE_OPTIONS, LOCATION_OPTIONS, PRICE_OPTIONS } =
  require("../../Utilities/constants").FORM_OPTIONS;

const FiltersBar = ({ onFilterSelect }) => {
  let [filterData, setFilterData] = useState({});

  const handleFilterChange = (filter, selectedOptions) => {
    // Create a copy of the current filters state
    const updatedFilters = { ...filterData };

    // Convert selectedOptions to an array
    const selectedOptionsArray = Array.isArray(selectedOptions)
      ? selectedOptions
      : [selectedOptions];

    // If the filter already exists in the updatedFilters, add the selected options to it
    if (updatedFilters.hasOwnProperty(filter)) {
      updatedFilters[filter] = [
        ...updatedFilters[filter],
        ...selectedOptionsArray,
      ];
    } else {
      // If the filter doesn't exist, create a new array with selected options
      updatedFilters[filter] = selectedOptionsArray;
    }

    // Update the filter with the selected options
    updatedFilters[filter] = selectedOptionsArray;
    console.log(`Filters updated to: ${JSON.stringify(updatedFilters)}`);
    setFilterData(updatedFilters);

    onFilterSelect(updatedFilters);
  };
  return (
    <div>
      <form
        className="Filters-bar"
        action={
          console.log(
            `form action happened with filterData = ${filterData}`
          ) /*onFilterSelect(filterData)*/
        }
      >
        <FilterButtonWithDropdown
          filter="cuisine"
          options={CUISINE_OPTIONS}
          onFilterChange={handleFilterChange}
        />
        <FilterButtonWithDropdown
          filter="location"
          options={LOCATION_OPTIONS}
          onFilterChange={handleFilterChange}
        />
        <FilterButtonWithDropdown
          filter="price"
          options={PRICE_OPTIONS}
          onFilterChange={handleFilterChange}
        />
      </form>
    </div>
  );
};

export default FiltersBar;

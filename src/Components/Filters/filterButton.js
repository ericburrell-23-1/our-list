import React from "react";
import "./filterButton.scss";

const FilterButton = ({ filter, renderOptions, label }) => {
  const dropdownClass = label.isOpen ? "dropdown on" : "dropdown"; // Add the "on" class if isOpen is true
  return (
    <div className={dropdownClass}>
      <label className="dropdown-label" onClick={label.toggleDropdown}>
        {label.checkedOptions.size === 0
          ? `Select ${filter}`
          : label.checkedOptions.size === 1
          ? [...label.checkedOptions][0]
          : label.areAllChecked
          ? "All Selected"
          : `${label.checkedOptions.size} Selected`}
      </label>

      {label.isOpen && (
        <div className="dropdown-list">
          <button
            className="dropdown-option"
            onClick={(e) => {
              e.preventDefault(); // Prevent click event from propagating
              label.toggleCheckAll();
            }}
          >
            {label.areAllChecked ? "Uncheck All" : "Check All"}
          </button>
          {renderOptions()}
        </div>
      )}
    </div>
  );
};

export default FilterButton;

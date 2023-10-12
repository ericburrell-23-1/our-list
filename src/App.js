import "./App.css";
import AppHeader from "./Components/Header/Header";
import SearchBar from "./Components/SearchBar/SearchBar";
import FiltersBar from "./Components/Filters/FiltersBar";
import AddNewButton from "./Components/AddNewButton/AddNewButton";
import ResultsArea from "./Components/Results/ResultsArea";
import React, { useState } from "react";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFormSubmit = (restaurantData) => {
    console.log("Form submitted, received restaurant data: ", restaurantData);
    setRestaurants(restaurantData);
  };
  const handleFilterSelect = (filterData) => {
    setFilters((prevFilters) => {
      // Merge the new filter data with the existing filters
      return { ...prevFilters, ...filterData };
    });
  };

  const handleSearchQuery = (searchName) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (searchName !== "") {
        console.log(
          `Searching for restaurants with name including ${searchName}...`
        );
        const regex = `.*${searchName}.*`; // Construct the regular expression pattern
        newFilters.name = { $regex: regex, $options: "i" };
      } else {
        console.log("Removing restaurant name from search criteria");
        delete newFilters.name;
      }
      console.log(
        `These are the filters being applied: ${JSON.stringify(newFilters)}`
      );
      return newFilters;
    });
  };

  return (
    <div className="App">
      <AppHeader />
      <SearchBar onSearch={handleSearchQuery} />
      <div className="FiltersAndButtonContainer">
        <div className="FiltersAndButtonWrapper">
          <FiltersBar
            className="FiltersBar"
            onFilterSelect={handleFilterSelect}
          />
          <AddNewButton
            className="AddNewButton"
            onFormSubmit={handleFormSubmit}
          />
        </div>
      </div>
      <ResultsArea restaurants={restaurants} filters={filters} />
    </div>
  );
}

export default App;

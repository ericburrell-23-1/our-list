import React, { useState } from "react";
import AddRestaurantPopUp from "../PopUps/AddRestaurantPopUp";
import "./AddNewButton.css";

function AddNewButton({ onFormSubmit }) {
  const [isPopUpVisible, setPopUpVisible] = useState(false);

  const togglePopUp = () => {
    console.log("AddNewRestaurantPopUp Toggled"); // Add this line for debugging
    setPopUpVisible(!isPopUpVisible);
  };

  return (
    <div style={{ flex: 1 }}>
      <button className="AddNewButton" onClick={togglePopUp}>
        Add New Restaurant
      </button>
      {isPopUpVisible && (
        <AddRestaurantPopUp
          togglePopUp={togglePopUp}
          onFormSubmit={onFormSubmit}
        />
      )}
    </div>
  );
}

export default AddNewButton;

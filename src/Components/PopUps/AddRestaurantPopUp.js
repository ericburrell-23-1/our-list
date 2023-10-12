import React, { useState } from "react";
import "./PopUps.css";

const { LOCAL_IP, FORM_OPTIONS } = require("../../Utilities/constants");

function AddRestaurantPopUp({ togglePopUp, onFormSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    location: "",
    price: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform actions to submit the form data to database
    try {
      // Create an object containing the restaurant data from form state (formData)
      const restaurantData = {
        name: formData.name,
        cuisine: formData.cuisine,
        location: formData.location,
        price: formData.price,
        notes: formData.notes,
        // Add other fields as needed
      };

      // Send a POST request to server
      const response = await fetch(
        `http://${LOCAL_IP}:3001/api/add-restaurant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify the content type
          },
          body: JSON.stringify(restaurantData), // Convert data to JSON format
        }
      );

      if (response.ok) {
        // The restaurant was added successfully
        console.log("Restaurant added successfully.");
        console.log("Form submitted with data:", formData);
        // Close the popup
        onFormSubmit(response.json());
        togglePopUp();
      } else {
        // Handle errors if the request was not successful
        console.error("Failed to add restaurant.");
      }
    } catch (error) {
      // Handle any network or other errors that may occur
      console.error("Error:", error);
    }
    // Close the popup
    togglePopUp();
  };

  return (
    <div id="popup-box" className="modal">
      <div className="content">
        <h1>Add a New Restaurant</h1>
        <b>
          <p>Input restaurant info here</p>
        </b>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Restaurant Name"
            required
          />{" "}
          <br />
          <label htmlFor="cuisine">Cuisine</label>
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={(e) =>
              setFormData({ ...formData, cuisine: e.target.value })
            }
            required
          >
            <option value="" disabled hidden>
              Select Cuisine
            </option>
            {FORM_OPTIONS.CUISINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="location">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          >
            <option value="" disabled hidden>
              Select Location
            </option>
            {FORM_OPTIONS.LOCATION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="price">Price</label>
          <select
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          >
            <option value="" disabled hidden>
              Select Price
            </option>
            {FORM_OPTIONS.PRICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            placeholder="I had the..."
          />
          <br />
          <div className="button-container">
            <button type="submit">Submit</button>
            <button type="button" onClick={togglePopUp}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRestaurantPopUp;

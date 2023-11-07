import { React, useState } from "react";
import "./PopUps.css";

const LOCAL_IP = require("../../Utilities/constants").LOCAL_IP;

const RestaurantDetailPopUp = ({ restaurant, onClose, onEdit }) => {
  // State Variables
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurant);
  const [editedRestaurant, setEditedRestaurant] = useState({
    name: selectedRestaurant.name,
    price: selectedRestaurant.price,
    cuisine: selectedRestaurant.cuisine,
    location: selectedRestaurant.location,
    notes: selectedRestaurant.notes,
  });

  // Functions
  const handleInputChange = (e, field) => {
    const updatedRestaurant = { ...editedRestaurant };
    updatedRestaurant[field] = e.target.value;
    setEditedRestaurant(updatedRestaurant);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://${LOCAL_IP}:3001/api/edit-restaurant/${restaurant._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedRestaurant),
      }
    );

    if (response.ok) {
      const updatedRestaurant = await response.json();
      setShowEditForm(false);
      onEdit(updatedRestaurant);
      setSelectedRestaurant(updatedRestaurant);
    } else {
      console.error("Edit request failed");
    }
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleDelete = () => {
    // Show a confirmation modal to confirm the deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );
    if (confirmDelete) {
      console.log("deleting");
      const URLString = `http://${LOCAL_IP}:3001/api/delete-restaurant/${restaurant._id}`;
      fetch(URLString, { method: "DELETE" }).then((res) => {
        console.log(`${res} deleted`);
        onEdit(res);
        onClose();
      });
    }
  };

  return (
    <div className="overlay">
      {!showEditForm && (
        <div className="popup restaurant-detail">
          <button className="close-button box-close" onClick={onClose}>
            X
          </button>
          <h2 className="restaurant-name">{selectedRestaurant.name}</h2>
          <div className="restaurant-info">
            <div className="restaurant-property">
              <strong>Cuisine:</strong>
              <span className="restaurant-cuisine">
                {selectedRestaurant.cuisine}
              </span>
            </div>
            <div className="restaurant-property">
              <strong>Location:</strong>
              <span className="restaurant-location">
                {selectedRestaurant.location}
              </span>
            </div>
            <div className="restaurant-property">
              <strong>Price:</strong>
              <span className="restaurant-price">
                {selectedRestaurant.price}
              </span>
            </div>
            <div className="restaurant-property">
              <strong>Notes:</strong>
              <p className="restaurant-notes">{selectedRestaurant.notes}</p>
            </div>
          </div>
          {/* You can add more details like address, rating, comments, and images here */}
          <div className="button-container">
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
      {showEditForm && (
        <div className="popup restaurant-edit-form">
          <div className="restaurant-info">
            <h2>Edit Restaurant</h2>
            <form onSubmit={handleEditSubmit}>
              <label className="restaurant-property">
                <strong>Name:</strong>
                <input
                  type="text"
                  value={editedRestaurant.name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              </label>

              <label className="restaurant-property">
                <strong>Cuisine:</strong>
                <input
                  className="restaurant-cuisine"
                  type="text"
                  value={editedRestaurant.cuisine}
                  onChange={(e) => handleInputChange(e, "cuisine")}
                />
              </label>

              <label className="restaurant-property">
                <strong>Location:</strong>
                <input
                  className="restaurant-location"
                  type="text"
                  value={editedRestaurant.location}
                  onChange={(e) => handleInputChange(e, "location")}
                />
              </label>

              <label className="restaurant-property">
                <strong>Price:</strong>
                <input
                  className="restaurant-price"
                  type="text"
                  value={editedRestaurant.price}
                  onChange={(e) => handleInputChange(e, "price")}
                />
              </label>

              <label className="restaurant-property">
                <strong>Notes:</strong>
                <br />
                <br />
                <br />
                <textarea
                  className="restaurant-notes"
                  rows="4"
                  value={editedRestaurant.notes}
                  onChange={(e) => handleInputChange(e, "notes")}
                />
              </label>
              <br />
              <br />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailPopUp;

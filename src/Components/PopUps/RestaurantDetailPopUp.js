import React from "react";
import "./PopUps.css";

const RestaurantDetailPopUp = ({ restaurant, onClose }) => {
  return (
    <div className="overlay">
      <div className="popup restaurant-detail">
        <button className="close-button box-close" onClick={onClose}>
          X
        </button>
        <h2 className="restaurant-name">{restaurant.name}</h2>
        <div className="restaurant-info">
          <div className="restaurant-property">
            <strong>Price:</strong>
            <span className="restaurant-price">{restaurant.price}</span>
          </div>
          <div className="restaurant-property">
            <strong>Cuisine:</strong>
            <span className="restaurant-cuisine">{restaurant.cuisine}</span>
          </div>
          <div className="restaurant-property">
            <strong>Location:</strong>
            <span className="restaurant-location">{restaurant.location}</span>
          </div>
          <div className="restaurant-property">
            <strong>Notes:</strong>
            <p className="restaurant-notes">{restaurant.notes}</p>
          </div>
        </div>
        {/* You can add more details like address, rating, comments, and images here */}
      </div>
    </div>
  );
};

export default RestaurantDetailPopUp;

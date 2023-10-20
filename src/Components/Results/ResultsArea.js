import React, { useEffect, useState } from "react";
import RestaurantDetailPopUp from "../PopUps/RestaurantDetailPopUp";
import "./Results.css";
const createFilterParams = require("../../Utilities/Functions");

const LOCAL_IP = require("../../Utilities/constants").LOCAL_IP;

const ResultsArea = ({ restaurants, filters }) => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});

  const handleRestaurantClick = (restaurantID) => {
    // Retrieve restaurant data by id from restaurantData
    const clickedRestaurant = restaurantData.find(
      (restaurant) => restaurant._id === restaurantID
    );

    // Set the restaurant data and show the detail view
    setSelectedRestaurant(clickedRestaurant);
    setShowDetail(true);
  };

  const handleCloseRestaurantDetail = () => {
    setShowDetail(false);
  };

  useEffect(() => {
    const paramString = createFilterParams(filters);

    const URLString = `http://${LOCAL_IP}:3001/api/restaurants?${paramString}`;
    console.log(`Attempting to fetch ${URLString}...`);
    fetch(URLString)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRestaurantData(data);
      });
  }, [restaurants, filters]);

  return (
    <div>
      <p>Matching restaurants:</p>
      {showDetail && (
        <RestaurantDetailPopUp
          restaurant={selectedRestaurant}
          onClose={handleCloseRestaurantDetail}
        />
      )}
      <table className="Styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Cuisine</th>
            <th>Location</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {restaurantData.map((restaurant) => (
            <tr
              key={restaurant._id}
              onClick={() => handleRestaurantClick(restaurant._id)}
            >
              <td>{restaurant.name}</td>
              <td>{restaurant.cuisine}</td>
              <td>{restaurant.location}</td>
              <td>{restaurant.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsArea;

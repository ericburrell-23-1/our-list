const mongoose = require("mongoose");

// CREATE RESTAURANT SCHEMA AND MODEL
const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 4,
  },
  notes: {
    type: String,
    maxLength: 500,
  },
});
module.exports = mongoose.model("Restaurant", restaurantSchema);

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;
const LOCAL_IP = require("../src/Utilities/constants").LOCAL_IP;
const databaseIP = "127.0.0.1";
const url = `mongodb://${databaseIP}:27017/restaurantList`;
const Restaurant = require("./Models/restaurant");

// CONNECT TO MONGODB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to ${url}...`));

// ENABLE JSON PARSING
app.use(express.json());

// GIVE ACCESS TO FRONT END DOMAIN ON PORT 3000 AND ALLOW DELETE/PUT METHODS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", `http://${LOCAL_IP}:3000`);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Methods"
  );
  next();
});

// GET ALL RESTAURANTS FROM DATABASE;
app.get("/api/restaurants", async (req, res) => {
  const documents = await Restaurant.find(req.query)
    .collation({ locale: "en" })
    .sort("name");
  res.send(documents);
});

// POST NEW RESTAURANT TO DATABASE
app.post("/api/add-restaurant", async (req, res) => {
  const newRestaurant = new Restaurant(req.body);
  const result = await newRestaurant.save();
  const documents = await Restaurant.find({}).sort("name");
  console.log(`Restaurant added to DB: ${result}`);
  res.send(documents);
});

// EDIT EXISTING RESTAURANT IN THE DATABASE BY ID
app.put("/api/edit-restaurant/:id", async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (restaurant === null) {
    return res
      .status(404)
      .send(`Restaurant with ID ${req.params.id} not found`);
  }
  for (let prop in req.body) {
    if (restaurant.toObject().hasOwnProperty(prop)) {
      // toObject method converts mongoose "document object" to object that works with hasOwnProperty
      restaurant[prop] = req.body[prop];
    } else {
      return res
        .status(400)
        .send(`Property ${prop} not allowed for this entry`);
    }
  }
  const result = await Restaurant.findByIdAndUpdate(
    req.params.id,
    {
      $set: restaurant,
    },
    { new: true }
  );
  res.send(result);
});

// DELETE A RESTAURANT BY ID
app.delete("/api/delete-restaurant/:id", async (req, res) => {
  const result = await Restaurant.findByIdAndDelete(req.params.id);
  if (result === null) {
    return res
      .status(404)
      .send(`Restaurant with ID ${req.params.id} not found`);
  }
  res.send(result);
});

// ENABLE SERVER ON SPECIFIED PORT
app.listen(port, () => {
  console.log(`Server running at http://${LOCAL_IP}:${port}`);
  // CONSIDER LOGGING THIS WITH WINSTON
});

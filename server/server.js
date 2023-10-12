const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;
const LOCAL_IP = require("../src/Utilities/constants").LOCAL_IP;
const databaseIP = "127.0.0.1";
const url = `mongodb://${databaseIP}:27017/restaurantList`;

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
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// CONNECT TO MONGODB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to ${url}...`));

// ENABLE JSON PARSING
app.use(express.json());

// GIVE ACCESS TO FRONT END DOMAIN ON PORT 3000
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", `http://${LOCAL_IP}:3000`);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// GET ALL RESTAURANTS FROM DATABASE;
app.get("/api/restaurants", async (req, res) => {
  console.log(req.query);
  const documents = await Restaurant.find(req.query).sort("name");
  console.log(documents);
  res.send(documents);
});

// POST NEW RESTAURANT TO DATABASE
app.post("/api/add-restaurant", async (req, res) => {
  console.log("req.body: ", req.body);
  const newRestaurant = new Restaurant(req.body);
  const result = await newRestaurant.save();
  const documents = await Restaurant.find({}).sort("name");
  res.send(documents);
});

// ENABLE SERVER ON SPECIFIED PORT
app.listen(port, () => {
  console.log(`Server running at http://${LOCAL_IP}:${port}`);
  // CONSIDER LOGGING THIS WITH WINSTON
});

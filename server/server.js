const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;
const serverIP = "192.168.0.6";
const localIP = "127.0.0.1";

const url = `mongodb://${localIP}:27017/restaurantList`;

const docSchema = mongoose.Schema({
  docName: {
    type: String,
    required: true,
  },
  postNum: {
    type: Number,
    required: true,
  },
});

const Doc = mongoose.model("Doc", docSchema);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to ${url}...`));

app.get("/", (req, res) => {
  res.send("Hello React!");
});

let postNum = 0;
app.get("/newDoc", async (req, res) => {
  postNum++;
  const newDoc = new Doc({ docName: "Eric", postNum: postNum });
  const result = await newDoc.save();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

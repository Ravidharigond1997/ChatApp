const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("Erroe" + err.message);
  });

const port = process.env.PORT || 8085;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require("express");
const connectDB = require("./src/config/db");
const userrouters = require("./src/route/user.route");
const cors = require("cors");
const app = express();
require('dotenv').config();

connectDB();

app.use(cors())
app.use(express.json());
app.use("/api", userrouters);

app.listen(7000, () => {
  console.log("app is running");
});

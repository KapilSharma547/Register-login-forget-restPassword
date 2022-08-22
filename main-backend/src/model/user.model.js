const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, default: "" },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: String,
    code: String,
    expireIN: Number,
  },
  {
    timestamps: true,
  }
);
// let otp = conn.model('otp',otpSchema,'otp')
module.exports = mongoose.model("Otp", otpSchema);

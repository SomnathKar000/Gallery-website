const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    reqiured: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", authSchema);

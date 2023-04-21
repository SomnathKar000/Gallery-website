const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Image", imageSchema);

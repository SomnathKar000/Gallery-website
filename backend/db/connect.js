const mongoose = require("mongoose");

const commectDb = (url) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = commectDb;

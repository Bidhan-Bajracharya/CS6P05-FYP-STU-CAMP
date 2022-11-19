const mongoose = require("mongoose");

connectDB = (url) => {
  // returning a promise
  // removing some deprecation warnings
  return mongoose.connect(url);
};

module.exports = connectDB;
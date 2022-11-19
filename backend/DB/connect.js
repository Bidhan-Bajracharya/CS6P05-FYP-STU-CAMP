const mongoose = require("mongoose");

connectDB = (url) => {
  // returning a promise
  return mongoose.connect(url);
};

module.exports = connectDB;
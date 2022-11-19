const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uni_id: {
    type: String,
    required: [true, "Must provide university ID."],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Must provide full name."],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  isStar: {
    type: Boolean,
    required: [true, "Must specify if user is a CR or not."],
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);

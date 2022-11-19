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
    // required: [true, "Must specify if user is a CR or not."],
    default: false,
  },
  department: {
    type: String,
    required: [true, "Must provide department."],
    trim: true,
  },
  section: {
    type: String,
    required: [true, "Must provide section."],
    maxlength: [5, "Section cannot be more than 5 characters"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Must provide year."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Must provide college email."],
    trim: true,
  },
});

module.exports = mongoose.model("User", UserSchema);

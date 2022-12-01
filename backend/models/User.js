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
    default: false,
  },
  isAdmin: {
    type: Boolean,
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
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  }
});

module.exports = mongoose.model("User", UserSchema);

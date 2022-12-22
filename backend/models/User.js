const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  uni_id: {
    type: String,
    required: [true, "Must provide university ID."],
  },
  name: {
    type: String,
    required: [true, "Must provide full name."],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  profile_pic: {
    type: String,
    default: "default",
  },
  userType: {
    type: Number,
    required: [true, "Please provide user type"],
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
  },
  refreshToken: {
    type: String,
  },
});

// methods
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createAccessToken = function () {
  const accessToken = jwt.sign(
    {
      userId: this._id,
      name: this.name,
      userType: this.userType,
      uni_id: this.uni_id,
      profile_pic: this.profile_pic,
      department: this.department,
      section: this.section,
      year: this.year,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
  return accessToken;
};

UserSchema.methods.createRefreshToken = function () {
  const refreshToken = jwt.sign(
    {
      userId: this._id,
      name: this.name,
      userType: this.userType,
      uni_id: this.uni_id,
      profile_pic: this.profile_pic,
      department: this.department,
      section: this.section,
      year: this.year,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "2d" }
  );
  return refreshToken;
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);

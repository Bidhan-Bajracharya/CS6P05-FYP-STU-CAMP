const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must provide full name."],
      trim: true,
      maxlength: [20, "Name cannot be more than 20 characters"],
    },

    email: {
      type: String,
      required: [true, "Must provide an email."],
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

    userType: {
      type: Number,
      required: [true, "Please provide user type"],
    },

    refreshToken: {
      type: String,
    },

    profile_pic: {
      type: String,
      default: "default",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AdminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.createAccessToken = function () {
  const accessToken = jwt.sign(
    {
      userId: this._id,
      name: this.name,
      userType: this.userType,
      email: this.email,
      profile_pic: this.profile_pic,
      createdAt: this.createdAt,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
  return accessToken;
};

AdminSchema.methods.createRefreshToken = function () {
  const refreshToken = jwt.sign(
    {
      userId: this._id,
      name: this.name,
      userType: this.userType,
      email: this.email,
      profile_pic: this.profile_pic,
      createdAt: this.createdAt,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
  return refreshToken;
};

AdminSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Admin", AdminSchema);

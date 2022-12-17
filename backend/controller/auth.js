const User = require("../models/User");
const Admin = require("../models/Admin");
const { ADMIN } = require("../permission/role");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password.");
  }

  let user = {};
  // checking if the user is admin or student
  if (email.includes("admin")) {
    user = await Admin.findOne({ email });
  } else {
    user = await User.findOne({ email });
  }

  // if user does not exists
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials, user not found.");
  }

  // check password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials, password incorrect.");
  }

  const accessToken = await user.createAccessToken();
  const refreshToken = await user.createRefreshToken();

  // saving the refreshToken in database
  if (user.userType == ADMIN) {
    await Admin.findByIdAndUpdate(
      { _id: user._id },
      { refreshToken: refreshToken },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    await User.findByIdAndUpdate(
      { _id: user._id },
      { refreshToken: refreshToken },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  // creating cookie
  // not accessible by js
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    // secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  
  res
    .status(StatusCodes.OK)
    .json({ user: { id: user._id, name: user.name, userType: user.userType }, accessToken });
};

module.exports = login;

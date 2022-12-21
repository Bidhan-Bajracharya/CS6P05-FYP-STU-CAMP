const Admin = require("../models/Admin");
const User = require("../models/User");
const jwt = require('jsonwebtoken')
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const { ADMIN } = require("../permission/role");

const logout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    throw new NotFoundError("Not found.");
  }
  const refreshToken = cookies.jwt;
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  // Finding the user
  let foundUser = {};
  if (decoded.userType == ADMIN) {
    foundUser = await Admin.findOne({ refreshToken }).exec();
  } else {
    foundUser = await User.findOne({ refreshToken }).exec();
  }

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    // return res.sendStatus(StatusCodes.NO_CONTENT);
    throw new NotFoundError("Not found.");
  }

  // Delete refreshToken in db
  if (foundUser.userType == ADMIN) {
    await Admin.findByIdAndUpdate(
      { _id: foundUser._id },
      { refreshToken: "" },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    await User.findByIdAndUpdate(
      { _id: foundUser._id },
      { refreshToken: "" },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.sendStatus(StatusCodes.NO_CONTENT);
};

module.exports = { logout };

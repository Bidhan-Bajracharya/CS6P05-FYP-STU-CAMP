const Admin = require("../models/Admin");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, NotFoundError } = require("../errors");
const jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  // checking if cookie is present
  if (!cookies?.jwt) {
    return res.sendStatus(403)
    throw new UnauthenticatedError("No refresh token provided.");
  }

  // extracting the token part
  const refreshToken = cookies.jwt;

  // storing the payload in a var
  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  let foundUser = {};
  // checking if the user is admin or student
  if (payload.userType == 1991) {
    foundUser = await Admin.findOne({ refreshToken }).exec();
  } else {
    foundUser = await User.findOne({ refreshToken }).exec();
  }

  if (!foundUser) {
    return res.sendStatus(403)
    throw new NotFoundError("No user found.");
  }

  // create a new access token
  const accessToken = await foundUser.createAccessToken();

  res.status(StatusCodes.OK).json({
    user: {
      id: foundUser._id,
      name: foundUser.name,
      userType: foundUser.userType,
    },
    accessToken,
  });
};

module.exports = { refreshToken };

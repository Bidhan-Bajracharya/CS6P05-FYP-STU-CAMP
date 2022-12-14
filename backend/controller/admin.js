const Admin = require("../models/Admin");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, NotFoundError } = require("../errors");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  const admin = await Admin.create(req.body);
  const token = admin.createJWT();

  res.status(StatusCodes.CREATED).json({ admin, token });
};

const refreshTokenAdmin = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    throw new UnauthenticatedError("No refresh token provided.");
  }
  const refreshToken = cookies.jwt;
  console.log("pre verified", refreshToken);
  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  console.log("payload", payload);

  const foundUser = await Admin.findOne({ refreshToken }).exec();
  // const foundUser = await Admin.findOne({ refreshToken });

  if (!foundUser) {
    throw new UnauthenticatedError("No user found.");
  }

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

const logoutAdmin = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    throw new NotFoundError("Not found.");
  }
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await Admin.findOne({ refreshToken }).exec();
  // const foundUser = await Admin.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(StatusCodes.NO_CONTENT);
    // throw new NotFoundError("Not found.");
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(StatusCodes.NO_CONTENT);
};

module.exports = { createAdmin, refreshTokenAdmin, logoutAdmin };

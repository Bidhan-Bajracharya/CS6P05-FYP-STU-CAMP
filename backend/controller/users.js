const User = require("../models/User");
const Post = require("../models/Post");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const viewAllUsers = async (req, res) => {
  const users = await User.find({}, "-password -userType -_id");
  res.status(StatusCodes.OK).json({ users });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getUser = async (req, res) => {
  // alias -> userID
  const { id: userID } = req.params;
  const user = await User.findOne({ _id: userID });

  if (!user) {
    return res
      .status(404)
      .json({ msg: `User with id:${userID} was not found.` });
  }

  res.status(StatusCodes.OK).json({ user });
};

const createUser = async (req, res) => {
  const uniID = req.body.uni_id;
  const checkUser = await User.findOne({ uni_id: uniID });

  if (checkUser) {
    throw new BadRequestError(
      `User with university id: ${uniID} already exists.`
    );
  }

  const user = await User.create(req.body);
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user, token });
};

const updateUser = async (req, res) => {
  // id bcuz, we have set params as 'id' in user-route
  const { id: userID } = req.params;

  // req.body contains a whole json data of the user with its updated value
  const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `User with id:${userID} was not found.` });
  }
  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findOneAndDelete({ _id: userID });

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `User with id:${userID} was not found.` });
  }

  // delete user related posts
  await Post.deleteMany({ createdBy: userID });

  res.status(StatusCodes.OK).json({ successful: true });
};

const refreshTokenUser = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    throw new UnauthenticatedError("No refresh token provided.");
  }
  const refreshToken = cookies.jwt;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  // const foundUser = await User.findOne({ refreshToken }).exec();
  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    throw new UnauthenticatedError("No user found.");
  }

  const accessToken = await foundUser.createAccessToken();
  res
    .status(StatusCodes.OK)
    .json({
      user: {
        id: foundUser._id,
        name: foundUser.name,
        userType: foundUser.userType,
      },
      accessToken,
    });
};

const logoutUser = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    throw new NotFoundError("Not found.");
  }
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  // const foundUser = await User.findOne({ refreshToken }).exec();
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.sendStatus(StatusCodes.NO_CONTENT);
      // throw new NotFoundError("Not found.");
  }

  // Delete refreshToken in db
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(StatusCodes.NO_CONTENT);
};

module.exports = {
  viewAllUsers,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  refreshTokenUser,
  logoutUser,
};

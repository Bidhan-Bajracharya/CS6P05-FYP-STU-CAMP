const User = require("../models/User");
const Post = require("../models/Post");
const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const viewAllUsers = async (req, res) => {
  const users = await User.find({}, "-password -_id -refreshToken");
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

module.exports = {
  viewAllUsers,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

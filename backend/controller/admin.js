const User = require("../models/User");
// const Admin = require("../models/Admin");
const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async(req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({users, count: users.length});
}

const getUser = async (req, res) => {
  // alias -> userID
  const { id: userID } = req.params;
  const user = await User.findOne({ _id: userID });

  // checking if the id provided exists in db
  if (!user) {
    return res.status(404).json({ msg: `User with id:${userID} was not found.` });
  }

  res.status(StatusCodes.OK).json({ user });
};

// const createAdmin = async (req, res) => {
//   const admin = await Admin.create(req.body);
//   const token = admin.createJWT();

//   res.status(StatusCodes.CREATED).json({ admin, token });
// };

const createUser = async (req, res) => {
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
  await Post.deleteMany({createdBy: userID})

  res.status(StatusCodes.OK).json({ successful: true });
};

// module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser, createAdmin };
module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };

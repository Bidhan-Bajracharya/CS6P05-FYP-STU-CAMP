const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

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

  res.status(StatusCodes.OK).json({ user, successful: true });
};

module.exports = { getUser, createUser, updateUser, deleteUser };

const User = require("../models/User")

const getAllUsers = (req, res) => {
  res.send("all users");
};

const createUser = async (req, res) => {
  const task = await User.create(req.body);
  res.status(200).json({task});
};

const updateUser = (req, res) => {
  res.send("user updated");
};

const deleteUser = (req, res) => {
  res.send("user deleted");
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
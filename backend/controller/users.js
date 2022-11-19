const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    // alias -> userID
    const { id: userID } = req.params;
    const user = await User.findOne({ _id: userID });

    // checking if the id provided exists in db
    if (!user) {
      return res
        .status(404)
        .json({ msg: `User with id:${userID} was not found.` });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    // id bcuz, we have set params as 'id' in user-route
    const { id: userID } = req.params;
    
    // req.body contains a whole json data of the user with its updated value
    const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ msg: `User with id:${userID} was not found.` });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findOneAndDelete({ _id: userID });

    if (!user) {
      return res
        .status(404)
        .json({ msg: `User with id:${userID} was not found.` });
    }

    res.status(200).json({ user, successful: true });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
};

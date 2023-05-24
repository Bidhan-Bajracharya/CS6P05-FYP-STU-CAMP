const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const path = require('path');

const viewAllUsers = async (req, res) => {
  const users = await User.find({}, "-password -_id -refreshToken");
  res.status(StatusCodes.OK).json({ users });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getUser = async (req, res) => {
  const { id: uniID } = req.params;
  const user = await User.findOne({ uni_id: uniID });

  if (!user) {
    throw new NotFoundError(`User with id: ${uniID} was not found.`);
  }

  res.status(StatusCodes.OK).json({ user });
};

const createUser = async (req, res) => {
  const {uni_id: uniID, email} = req.body;
  const checkUser = await User.findOne({ uni_id: uniID });

  if (checkUser) {
    throw new BadRequestError(
      `Duplicate university ID found.`
    );
  }

  // check if the email address is valid or not
  const emailRegex = /^[^\s@]+@(islingtoncollege\.edu\.np|gmail\.com)$/i;
  if(!emailRegex.test(email)){
    throw new BadRequestError("Please provide a valid email.")
  }

  const user = await User.create(req.body);
  const token = user.createRefreshToken();

  res.status(StatusCodes.CREATED).json({ user, token });
};

const updateUser = async (req, res) => {
  // id bcuz, we have set params as 'id' in user-route
  const { id: userID } = req.params;

  // check for duplicate email
  const checkEmail = await User.findOne({ email: req.body.email });
  if (checkEmail) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Email already exists.` });
  }

  // check for duplicate uni_id
  const checkUniID = await User.findOne({ uni_id: req.body.uni_id });
  if (checkUniID) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Duplicate University ID found.` });
  }

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
  const { id: uniID } = req.params;
  const userInfo = await User.findOne({ uni_id: uniID }, "_id profile_pic");

  if (!userInfo._id) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `User with id:${uniID} was not found.` });
  }

  // delete profile_pic if exists
  if(userInfo.profile_pic !== "default"){
    fs.unlink(path.resolve(__dirname, "../", "public/images") + `/${userInfo.profile_pic}`, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  const user = await User.findOneAndDelete({ _id: userInfo._id });

  // delete user related posts
  await Post.deleteMany({ createdBy: userInfo._id });

  res.status(StatusCodes.OK).json({ successful: true });
};

const resetUserPassword = async (req, res) => {
  const newPassword = req.body.newPassword;
  const userId = req.user.userId;

  const user = await User.findOne({ _id: userId });

  // checking if user exists
  if (!user) {
    throw new BadRequestError(`User with id: ${userId} was not found.`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  const isPasswordSame = await user.comparePassword(newPassword);

  // checking if the new password matches old one
  if (isPasswordSame) {
    throw new BadRequestError(
      `New password cannot be same as the old password.`
    );
  }

  // passing the newly hashed password
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { password: hashedNewPassword },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ updatedUser });
};

const changeProfilePicture = async (req, res) => {
  const { userId } = req.user;
  const { picture } = req.body;

  if (!picture) {
    throw new BadRequestError("No picture was provided.");
  }

  // check if user had profile pic
  const userInfo = await User.findOne({_id: userId}, "-_id profile_pic")
  
  // delete previous picture if exists
  if(userInfo.profile_pic !== "default"){
    fs.unlink(path.resolve(__dirname, "../", "public/images") + `/${userInfo.profile_pic}`, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { profile_pic: picture },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ user });
};

const emailNotificationPreference = async (req, res) => {
  const { userId } = req.user;
  const { preferences } = req.body;

  // if(preferences.length === 0 || !preferences){
  //   throw new BadRequestError("No preferences information provided.")
  // }

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { notification: preferences },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ user });
};

module.exports = {
  viewAllUsers,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  resetUserPassword,
  changeProfilePicture,
  emailNotificationPreference,
};

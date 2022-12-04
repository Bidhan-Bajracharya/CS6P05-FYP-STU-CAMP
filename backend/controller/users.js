const User = require("../models/User");
const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");

const viewAllUsers = async (req, res) => {
  const users = await User.find({}, "-password -userType -_id");
  res.status(StatusCodes.OK).json({ users });
};

const viewAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

module.exports = {
  viewAllUsers,
  viewAllPosts,
};

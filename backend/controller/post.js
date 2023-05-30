const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const fs = require("fs");
const path = require('path');

const viewAllPosts = async (req, res) => {
  const posts = await Post.find({})
    .populate("createdBy", "name profile_pic department section year")
    .populate("comments", "createdBy body createdAt")
    .populate({
      path: "comments",
      populate: { path: "createdBy", model: "User", select: "name" },
    })
    .sort([
      ["createdAt", -1], // sort by createdAt in descending order
    ]);

  res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

// admin access
const getUserHistory = async (req, res) => {
  const { id: uniID } = req.params;

  if (!uniID) {
    throw new BadRequestError("No uniID provided.");
  }

  const userId = await User.find({ uni_id: uniID }, "_id");

  if (userId.length === 0) {
    throw new BadRequestError("No user found.");
  }

  const posts = await Post.find({ createdBy: userId })
    .populate("createdBy", "name profile_pic department section year")
    .populate("comments", "createdBy body createdAt")
    .sort([["createdAt", -1]]);

  res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

// specific to user
const getAllPosts = async (req, res) => {
  const user = req.user.userId;
  const posts = await Post.find({ createdBy: user })
    .populate("createdBy", "name profile_pic department section year")
    .populate("comments", "createdBy body createdAt")
    .sort([["createdAt", -1]]);

  res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

const createPost = async (req, res) => {
  const createdBy = req.user.userId;
  req.body.createdBy = createdBy;

  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const getPost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId })
    .populate("createdBy", "name profile_pic department section year")
    .populate("comments", "createdBy body createdAt");

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const {
    params: { id: postId },
  } = req;

  const imgPost = await Post.findOne({ _id: postId }, "-_id img");
  
  // checking if img exists or not
  if (JSON.stringify(imgPost) !== "{}") {
    // deleting the image
    fs.unlink(path.resolve(__dirname, "../", "public/images") + `/${imgPost.img}`, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  const post = await Post.findOneAndRemove({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  // delete comments related to the post
  await Comment.deleteMany({ postId: postId });

  res.status(StatusCodes.OK).send("Delete successful");
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  deletePost,
  viewAllPosts,
  getUserHistory,
};

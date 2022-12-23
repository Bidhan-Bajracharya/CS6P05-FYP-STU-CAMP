const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const viewAllPosts = async (req, res) => {
  const posts = await Post.find({})
    .populate("createdBy", "name profile_pic department section")
    .sort([
      ["createdAt", -1], // sort by createdAt in descending order
    ]);

  res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

// admin access
const getUserHistory = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new BadRequestError("No userId found.");
  }

  const posts = await Post.find({ createdBy: userId })
    .populate("createdBy", "name profile_pic department section")
    .sort("createdAt");

  res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

// specific to user
const getAllPosts = async (req, res) => {
  const user = req.user.userId;
  const posts = await Post.find({ createdBy: user })
    .populate("createdBy", "name profile_pic department section")
    .sort("createdAt");

  res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

const createPost = async (req, res) => {
  const createdBy = req.user.userId;
  req.body.createdBy = createdBy;

  // suspend user from posting content
  // const isSuspended = User.findOne({req.user.userId}, "isSuspended")
  // if(isSuspended){...throw}
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const getPost = async (req, res) => {
  const user = req.user.userId;
  const { id: postId } = req.params;

  const post = await Post.findOne({ createdBy: user, _id: postId }).populate(
    "createdBy",
    "name profile_pic department section"
  );

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const {
    params: { id: postId },
  } = req;

  const post = await Post.findOneAndRemove({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
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

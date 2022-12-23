const { ADMIN, STAR } = require("./role");
const Post = require("../models/Post");
const { BadRequestError, NotFoundError } = require("../errors");

const deletePostAuth = async (req, res, next) => {
  const { userId, userType } = req.user;
  const { id: postId } = req.params;
  const createrOfPost = await Post.findOne({ _id: postId });

  if (!createrOfPost) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  // checking if the logged-in user is
  // 1. ADMIN or not
  // 2. STAR or not
  // 1. Owner of the post or not
  if (userType !== ADMIN && userId !== createrOfPost.createdBy.toString() && userType !== STAR) {
    throw new BadRequestError("Not authorized to delete this post.");
  }
  next();
};

module.exports = { deletePostAuth };

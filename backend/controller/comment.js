const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createComment = async (req, res) => {
  const createdBy = req.user.userId;
  const { body, postId } = req.body;
  req.body.createdBy = createdBy;

  if (!postId) {
    throw new BadRequestError("No post reference provided.");
  }

  if (!body) {
    throw new BadRequestError("No body provided.");
  }

  // selects username, if it had @mention init
  const modifiedComment = body.replace(/@\[(.*?)\]\(\d+\)/, "$1");
  req.body.body = modifiedComment;

  // check if post exists
  const findPost = await Post.findOne({ _id: postId });

  if (!findPost) {
    throw new NotFoundError(`No post with id: ${postId} was found.`);
  }

  // create the comment
  const comment = await Comment.create(req.body);

  // add the comment to the post
  await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: comment._id } }
  );

  // sending array of new comments related to the post
  const postComments = await Comment.find({ postId }).populate("createdBy", "name profile_pic");

  res.status(StatusCodes.CREATED).json({ postComments });
};

const deleteComment = async (req, res) => {
  const { userId, userType } = req.user;
  const { id: commentId } = req.params;

  // find the creator of the comment
  const comment = await Comment.find(
    { _id: commentId },
    "-_id createdBy"
  ).populate("createdBy", "_id");

  const creatorId = comment[0].createdBy._id.toString();

  if (creatorId !== userId && userType !== 1991 && userType !== 1691) {
    throw new BadRequestError("Unauthorized to delete this comment.");
  }

  // removes comment from post as well
  await Comment.findOneAndDelete({ _id: commentId });

  res.status(StatusCodes.OK).send("Comment deleted.");
};

const getAllComments = async (req, res) => {
  const comments = await Comment.find({}).populate(
    "createdBy",
    "name uni_id department section"
  );
  res.status(StatusCodes.OK).json({ comments, count: comments.length });
};

const getAllPostComments = async (req, res) => {
  const { id: postId } = req.params;
  
  if(!postId){
    throw new BadRequestError("No postId provided.")
  }
  
  // checking if post exists
  const findPost = await Post.findOne({ _id: postId });
  if (!findPost) {
    throw new NotFoundError(`No post with id: ${postId} was found.`);
  }

  const postComments = await Comment.find({ postId }).populate("createdBy", "name profile_pic");

  res.status(StatusCodes.OK).json({ postComments, count: postComments.length });
};

module.exports = {
  createComment,
  getAllComments,
  getAllPostComments,
  deleteComment,
};

const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    postId: {
      type:mongoose.Types.ObjectId,
      ref: "Post",
      required: [true, "Please the post."],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the user."],
    },
    body: {
      type: String,
      required: [true, "Must provide body content."],
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("Comment", CommentSchema);

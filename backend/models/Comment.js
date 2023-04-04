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
      refPath: 'commentType',
      required: [true, "Please provide the user."],
    },
    body: {
      type: String,
      required: [true, "Must provide body content."],
    },
    // commentType: {
    //   type: String,
    //   required: [true, "Specify the type of comment."],
    //   enum: ["Admin", "User"],
    // },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("Comment", CommentSchema);

const express = require("express");
const router = express.Router();

const {
  createComment,
  getAllComments,
  deleteComment,
  getAllPostComments,
} = require("../controller/comment");

router.route("/").get(getAllComments).post(createComment);
router.route("/:id").delete(deleteComment).get(getAllPostComments);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAllPosts, // specific user
  createPost,
  getPost,
  deletePost,
} = require("../controller/post");

const {deletePostAuth} = require('../permission/post')

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPost)
router.route("/:id").delete(deletePostAuth, deletePost)

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  getAllPosts, // specific user
  createPost,
  getPost,
  deletePost,
} = require("../controller/post");

const {deletePostAuth} = require('../permission/post')
const checkStudent = require('../middleware/studentAuth')

router.route("/").get(getAllPosts).post(checkStudent, createPost);
router.route("/:id").get(getPost)
router.route("/:id").delete(deletePostAuth, deletePost)

module.exports = router;
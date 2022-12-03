const express = require("express");
const router = express.Router();
const {
  viewAllUsers,
  viewAllPosts,
} = require("../controller/users");

router.route("/people").get(viewAllUsers)
router.route("/post").get(viewAllPosts)

module.exports = router;

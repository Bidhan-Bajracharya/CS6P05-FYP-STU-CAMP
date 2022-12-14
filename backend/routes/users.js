const express = require("express");
const router = express.Router();

const { viewAllUsers, logoutUser, refreshTokenUser } = require("../controller/users");
const { viewAllPosts } = require("../controller/post");
const { createReport } = require("../controller/report");

router.route("/people").get(viewAllUsers);
router.route("/post").get(viewAllPosts);
router.route("/report").post(createReport);
router.route("/logout").get(logoutUser);
router.route("/refresh").get(refreshTokenUser);

module.exports = router;

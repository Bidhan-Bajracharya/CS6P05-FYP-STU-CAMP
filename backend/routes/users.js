const express = require("express");
const router = express.Router();

const { viewAllUsers } = require("../controller/users");
const { viewAllPosts } = require("../controller/post");
const { createReport } = require("../controller/report");

router.route("/people").get(viewAllUsers);
router.route("/post").get(viewAllPosts);
router.route("/report").post(createReport);

module.exports = router;

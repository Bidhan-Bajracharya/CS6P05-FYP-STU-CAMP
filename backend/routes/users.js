const express = require("express");
const router = express.Router();

const { viewAllUsers } = require("../controller/users");
const { viewAllPosts } = require("../controller/post");
const { createReport } = require("../controller/report");
const { getAdmins } = require("../controller/admin");

router.route("/people").get(viewAllUsers);
router.route("/people/admin").get(getAdmins);
router.route("/post").get(viewAllPosts);
router.route("/report").post(createReport);

module.exports = router;

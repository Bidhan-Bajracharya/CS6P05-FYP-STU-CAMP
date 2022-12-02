const express = require("express");
const router = express.Router();
const {
  getAllUsers,
} = require("../controller/users");

router.route("/").get(getAllUsers)

module.exports = router;

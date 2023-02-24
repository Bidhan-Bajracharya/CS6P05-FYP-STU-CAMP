const express = require("express");
const router = express.Router();

const { createEmail } = require("../controller/email.js");

router.route("/").post(createEmail);

module.exports = router;

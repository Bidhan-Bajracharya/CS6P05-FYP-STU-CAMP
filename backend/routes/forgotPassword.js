const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword } = require("../controller/forgotPassword");

router.post("/", forgotPassword);
router.post("/reset/:id/:token", resetPassword);

module.exports = router;

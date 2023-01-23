const express = require("express");
const router = express.Router();

// User controllers
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controller/users");

// Report controllers
const {
  updateReport,
  deleteReport,
  getAllReports,
  getReport,
} = require("../controller/report");

// Admin controller
const { resetAdminPassword } = require("../controller/admin");

// Post controller
const { getUserHistory } = require("../controller/post");

router.route("/user").get(getAllUsers).post(createUser);
router.route("/user/:id").patch(updateUser).get(getUser).delete(deleteUser);
router.route("/report").get(getAllReports);
router
  .route("/report/:id")
  .get(getReport)
  .patch(updateReport)
  .delete(deleteReport);
router.route("/user-history").get(getUserHistory);
router.route("/reset-password").patch(resetAdminPassword);

module.exports = router;

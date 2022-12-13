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

// Post controller
const { getUserHistory } = require("../controller/post");

router.route("/user").get(getAllUsers).post(createUser);
router.route("/user/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/report").get(getAllReports);
router
  .route("/report/:id")
  .get(getReport)
  .patch(updateReport)
  .delete(deleteReport);
router.route("/user-history").get(getUserHistory);

module.exports = router;

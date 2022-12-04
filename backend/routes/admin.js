const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controller/users");

const {
  updateReport,
  deleteReport,
  getAllReports,
  getReport,
} = require("../controller/report");

router.route("/user").get(getAllUsers).post(createUser);
router.route("/user/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/report").get(getAllReports);
router
  .route("/report/:id")
  .get(getReport)
  .patch(updateReport)
  .delete(deleteReport);
// router.route('/createAdmin').post(createAdmin);

module.exports = router;

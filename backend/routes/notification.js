const express = require("express");
const router = express.Router();

const checkAdmin = require("../middleware/adminAuth");

const {
  createNotification,
  getNotification,
  deleteNotification,
  getAllUserNotification,
  updateNotification, // mark as seen update
  getAllNotifications,
} = require("../controller/notification");

router
  .route("/")
  .post(createNotification)
  .get(getAllUserNotification)
  .patch(updateNotification);
router.route("/manage").get(checkAdmin, getAllNotifications);
router.route("/:id").delete(checkAdmin, deleteNotification).get(getNotification);

module.exports = router;

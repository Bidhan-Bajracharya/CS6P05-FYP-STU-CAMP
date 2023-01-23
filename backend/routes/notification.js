const express = require("express");
const router = express.Router();

const {
  createNotification,
  getNotification,
  deleteNotification,
  getAllUserNotification,
  updateNotification,
} = require("../controller/notification");

router.route("/").post(createNotification).get(getAllUserNotification);
router.route("/:id").delete(deleteNotification).get(getNotification).patch(updateNotification);

module.exports = router;

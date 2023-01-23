const express = require("express");
const router = express.Router();

const {
  createNotification,
  getNotification,
  deleteNotification,
  getAllUserNotification,
} = require("../controller/notification");

router.route("/").post(createNotification).get(getAllUserNotification);
router.route("/:id").delete(deleteNotification).get(getNotification);

module.exports = router;

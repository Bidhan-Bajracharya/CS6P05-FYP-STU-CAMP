const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/users");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").patch(updateUser).delete(deleteUser);

module.exports = router;
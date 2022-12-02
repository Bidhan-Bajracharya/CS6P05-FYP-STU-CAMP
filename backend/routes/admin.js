const express = require('express')
const router = express.Router()
const {
    createUser,
    updateUser,
    deleteUser,
    getUser,
  } = require("../controller/admin");

router.route('/user').post(createUser);
router.route("/user/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
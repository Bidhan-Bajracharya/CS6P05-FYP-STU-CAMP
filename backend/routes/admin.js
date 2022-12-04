const express = require('express')
const router = express.Router()

const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    // createAdmin
  } = require("../controller/admin");

router.route('/user').get(getAllUsers).post(createUser);
router.route("/user/:id").get(getUser).patch(updateUser).delete(deleteUser);
// router.route('/createAdmin').post(createAdmin);

module.exports = router;
const express = require("express");

const router = express.Router();
const {
  deleteUser,
  fetchUser,
  updateUser,
  createUser,
} = require("../controllers/userController");

router.route("/fetch-user/:id").get(fetchUser);
router.route("/update-user/:id").put(updateUser);
router.route("/delete-user/:id").delete(deleteUser);
router.route("/create-user").post(createUser);

module.exports = router;

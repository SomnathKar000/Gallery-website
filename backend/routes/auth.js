const {
  createUser,
  loginUser,
  getUser,
} = require("../controllers/authController");
const authentication = require("../middleware/authentication");
const express = require("express");

const router = express.Router();

router.route("/create-user").post(createUser);
router.route("/login").post(loginUser);
router.route("/get-user").post(authentication, getUser);

module.exports = router;

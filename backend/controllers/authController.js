const User = require("../models/authModel");
const customError = require("../errors/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "amisomnath";

const createUser = async (req, res) => {
  const { userName, email, password } = req.body;

  let user = await User.findOne({ email: email });
  if (user) {
    throw new customError("This email already exsist", 400);
  }

  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(password, salt);
  user = await User.create({
    email: email,
    username: userName,
    password: securePassword,
  });
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, jwtSecret);
  return res
    .status(200)
    .json({ success: true, msg: "Sign in successful", token });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    throw new customErroe("User does not exsist", 400);
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new customError("Enter valid details", 400);
  }
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, jwtSecret);
  return res
    .status(200)
    .json({ success: true, token, msg: "Login successful" });
};
const getUser = async (req, res) => {
  let user = await User.findById(req.user.id).select("-password");
  if (!user) {
    throw new customError("User does not exsist", 404);
  }
  res.status(200).json({ success: true, msg: "get user", user });
};

module.exports = { createUser, loginUser, getUser };

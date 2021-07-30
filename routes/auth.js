const express = require("express");
const router = express.Router();
const User = require("../models/User");

const {
  addUserHandler,
  login,
  getSpecificUser,
  updateProfile,
  getAllUsers,
  changePassword,
} = require("../controllers/userControllers");
module.exports = router;

//Add new user
router.post("/adduser", addUserHandler);

// login
router.post("/login", login);

//get specific user
router.get("/:userId", getSpecificUser);

//update specific user
router.put("/:userId", updateProfile);

//get all users
router.get("/", getAllUsers);

//change password

router.put("/changepassword/:userId", changePassword);

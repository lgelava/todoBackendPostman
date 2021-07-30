const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register
const addUserHandler = async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  //checking username exists

  try {
    const existUsername = await User.findOne({ userName: req.body.userName });
    const existEmail = await User.findOne({ email: req.body.email });
    if (existUsername) {
      res.status(404).send("username taken");
    } else if (existEmail) {
      res.status(404).send("email taken");
    } else {
      const savedUser = await newUser.save();
      res.send(savedUser);
    }
  } catch (err) {
    res.json({ message: err });
  }
};

// login;
const login = async (req, res) => {
  const user = await User.findOne({ userName: req.body.userName });
  if (!user) return res.status(400).send("username was not found");

  const validPass = await bcrypt.compareSync(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");
  try {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.send({ token: token, author: user._id });
    console.log(user._id);
  } catch (err) {
    res.status(400).send(err);
  }
};

//specific user
const getSpecificUser = async (req, res) => {
  try {
    const specUser = await User.findOne({ _id: req.params.userId });
    res.status(200).send(specUser);
  } catch (err) {
    res.json({ message: err });
  }
};

//update profile
const updateProfile = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: { email: req.body.email, userName: req.body.userName } }
    );

    res.status(200).send(updateUser);
  } catch (err) {
    res.json({ message: err });
  }
};

//get users
const getAllUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (err) {
    res.json({ message: err });
  }
};

//change password
const changePassword = async (req, res) => {
  const specUser = await User.findOne({ _id: req.params.userId });
  const newPassword = await bcrypt.hash(req.body.password, 10);
  let met = await bcrypt.compare(req.body.currentPassword, specUser.password);

  console.log(req.body.currentPassword, specUser.password);

  if (met) {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { password: newPassword }
    );
    res.status(200).send(updatedUser);
  } else {
    res.send("Not worked");
  }
};

module.exports = {
  addUserHandler,
  login,
  getSpecificUser,
  updateProfile,
  getAllUsers,
  changePassword,
};

// Importing modules
const express = require("express");
const router = express.Router();

// Importing User Schema
const User = require("../model/user");

// User login api
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.password)) {
        return res.status(201).send({
          message: "User Logged In",
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  });
});

// User signup api
router.post("/signup", (req, res, next) => {
  let newUser = new User();
  (newUser.name = req.body.name),
    (newUser.email = req.body.email),
    newUser.setPassword(req.body.password);
  newUser.save((err, User) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add user.",
      });
    } else {
      return res.status(201).send({
        message: "User added successfully.",
      });
    }
  });
});

// Export module to allow it to be imported in other files
module.exports = router;

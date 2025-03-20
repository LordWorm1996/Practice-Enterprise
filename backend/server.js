require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../model/user");

const app = express();
const PORT = 5000;

app.use(express.json());

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

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

//Export model
module.exports = router;

// GET Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST New User
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "Failed to create user" });
  }
});

// PUT User
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Failed to update user" });
  }
});

// DELETE User
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete user" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

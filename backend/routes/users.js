const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const { User, validate } = require("../models/user");

router.get("/me", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;

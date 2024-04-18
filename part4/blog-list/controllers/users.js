const User = require("../models/user");
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

usersRouter.post("/", async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

  const user = new User({
    ...req.body,
    password: passwordHash,
  });

  if (req.body.password.length < 3) {
    return res.status(400).json({ error: `password length is less than 3` });
  }

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = usersRouter;

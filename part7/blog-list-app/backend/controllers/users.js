const User = require("../models/user");
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { user: 0, likes: 0 });

  res.status(200).json(users);
});

usersRouter.post("/", async (req, res) => {
  const saltRounds = 10;

  if (req.body.password.length < 3) {
    return res.status(400).json({ error: `invalid password` });
  }
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

  const user = new User({
    ...req.body,
    passwordHash: passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = usersRouter;

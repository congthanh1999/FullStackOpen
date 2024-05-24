const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const SECRET = require("../utils/config").SECRET;

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: `invalid username or password` });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id });
});

module.exports = loginRouter;

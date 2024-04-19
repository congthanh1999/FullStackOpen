const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const config = require("./utils/config");
const middleware = require("./middlewares/middleware");
const loginRouter = require("./controllers/login");

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use(cors());
app.use(middleware.errorHandler);

module.exports = app;

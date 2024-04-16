const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use("/api/blogs", blogsRouter);
app.use(cors());
app.use(express.json());

module.exports = app;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);
const url =
  "mongodb+srv://congthanh10021999:truongcongT99@blog-cluster.lgptlw3.mongodb.net/blog?retryWrites=true&w=majority&appName=blog-cluster";

mongoose.connect(url);

app.use(cors);
app.use(express.json());

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs));
});

app.post("/api/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog.save.then((createdBlog) => res.status(204).json(createdBlog));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs));
});

blogsRouter.post("/", (req, res) => {
  const blog = new Blog({
    title: "fwfw",
    author: "fef",
    url: "efwf",
    likes: 25,
  });

  blog.save().then((createdBlog) => res.status(201).json(createdBlog));
});

module.exports = blogsRouter;

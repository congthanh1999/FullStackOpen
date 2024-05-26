const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    blogs: 0,
    passwordHash: 0,
  });

  res.status(200).json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  res.json(blog);
});

blogsRouter.post("/", async (req, res) => {
  const user = req.user;

  let blog = new Blog({
    ...req.body,
    user: user._id,
  });

  const createdBlog = await blog.save();
  const populatedBlog = await Blog.findById(createdBlog.id).populate("user", {
    blogs: 0,
    passwordHash: 0,
  });

  user.blogs = user.blogs.concat(createdBlog._id);
  await user.save();

  if (createdBlog.title && createdBlog.url) {
    res.status(201).json(populatedBlog);
  } else {
    res.status(400).json({ error: "bad request" });
  }
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const blogToComment = await Blog.findById(req.params.id);

  blogToComment.comments.push(req.body.comment);
  const updatedBlog = await blogToComment.save();
  const populatedBlog = await Blog.findById(updatedBlog.id).populate("user", {
    blogs: 0,
    passwordHash: 0,
  });

  res.status(200).json(populatedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  const requestedBlog = await Blog.findById(id).populate("user");
  if (user.id !== requestedBlog.user.id) {
    res.status(401).json({ error: "you cannot delete this blog" });
  } else {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    user.blogs = user.blogs.filter(
      (blog) => blog._id.toString() !== deletedBlog._id.toString()
    );
    await user.save();

    res.status(201).json(deletedBlog);
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate("user", {
    blogs: 0,
    passwordHash: 0,
  });

  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;

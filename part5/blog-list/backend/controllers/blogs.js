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
  console.log(blog.toJSON());
});

blogsRouter.post("/", async (req, res) => {
  const user = req.user;

  let blog = new Blog({
    ...req.body,
    user: user._id,
  });

  if (!(blog.title && blog.url)) {
    return res.status(400).json({ error: "title or url is missing" });
  }

  const createdBlog = await blog.save();

  user.blogs = user.blogs.concat(createdBlog._id);
  await user.save();

  res.status(201).json(createdBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  const deletedBlog = await Blog.findByIdAndDelete(id);

  user.blogs = user.blogs.filter(
    (blog) => blog._id.toString() !== deletedBlog._id.toString()
  );

  await user.save();

  res.status(200).json(deletedBlog);
});

blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate("user", {
    blogs: 0,
  });

  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
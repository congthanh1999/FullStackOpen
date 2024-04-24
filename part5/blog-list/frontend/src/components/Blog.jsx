import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(true);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const display = {
    display: visible ? "none" : "",
  };

  const handleToggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeBlog = async () => {
    setLikes(likes + 1);
    await blogService.update(blog.id, {
      ...blog,
      likes: likes + 1,
      user: blog.user.id,
    });
  };

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const deletedBlog = await blogService.remove(blog.id);
      setBlogs((prevBlogs) =>
        prevBlogs.filter((prevBlog) => prevBlog.id !== deletedBlog.id)
      );
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={handleToggleVisibility}>
        {visible ? `view` : `hide`}
      </button>
      <div style={display}>
        <div>{blog.url}</div>
        <div>
          {likes} <button onClick={handleLikeBlog}>like</button>
        </div>
        <div>{blog.user.username}</div>
        <button onClick={handleDeleteBlog}>remove</button>
      </div>
    </div>
  );
};

export default Blog;

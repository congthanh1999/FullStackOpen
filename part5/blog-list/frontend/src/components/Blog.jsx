import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const display = {
    display: visible ? "" : "none",
  };

  const handleToggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeBlog = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    const res = await blogService.update(blog.id, updatedBlog);

    setBlogs((prevBlogs) =>
      prevBlogs.map((prevBlog) => (prevBlog.id === blog.id ? res : prevBlog))
    );
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
    <div style={blogStyle} className="blog">
      <div className="blog-summary">
        {blog.title} {blog.author}{" "}
        <button onClick={handleToggleVisibility} className="view-button">
          {visible ? `hide` : `view`}
        </button>
      </div>
      <div className="blog-details" style={display}>
        <div>{blog.url}</div>
        <div className="likes">
          likes {blog.likes}{" "}
          <button className="like-button" onClick={handleLikeBlog}>
            like
          </button>
        </div>
        <div className="username">{blog.user.username}</div>
        <button onClick={handleDeleteBlog}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
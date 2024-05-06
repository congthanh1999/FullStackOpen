import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, handleNotification }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

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
    setLikes((prev) => prev + 1);

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    const res = await blogService.update(blog.id, updatedBlog);

    setBlogs((prevBlogs) =>
      prevBlogs
        .map((prevBlog) => (prevBlog.id === blog.id ? res : prevBlog))
        .sort((blog1, blog2) => blog2.likes - blog1.likes)
    );
  };

  const handleDeleteBlog = async () => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    if (confirmation) {
      try {
        const deletedBlog = await blogService.remove(blog.id);

        setBlogs((prevBlogs) =>
          prevBlogs.filter((prevBlog) => prevBlog.id !== deletedBlog.id)
        );

        handleNotification(
          `deleted ${deletedBlog.title} by ${deletedBlog.author}`,
          true
        );
      } catch (error) {
        handleNotification(error.response.data.error, false);
      }
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
          <div data-testid="like-text" style={{ display: "inline" }}>
            likes {likes}
          </div>
          &nbsp;
          <button
            data-testid="like-button"
            className="like-button"
            onClick={handleLikeBlog}
          >
            like
          </button>
        </div>
        <div className="username">{blog.user.username}</div>
        <button onClick={handleDeleteBlog} className="remove-button">
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;

import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationThunk } from "../reducers/notificationReducer";
import { updateBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButtonStyle = {
    display: blog.user.username === user.username ? "" : "none",
  };

  const display = {
    display: visible ? "" : "none",
  };

  const handleToggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeBlog = async () => {
    setLikes((prev) => prev + 1);

    const updateContent = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    dispatch(updateBlog(updateContent));
  };

  const handleDeleteBlog = async () => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    if (confirmation) {
      try {
        const removedBlog = await dispatch(removeBlog(blog.id));

        dispatch(
          setNotificationThunk({
            message: `deleted ${removedBlog.title} by ${removedBlog.author}`,
            success: true,
          })
        );
      } catch (error) {
        dispatch(
          setNotificationThunk({
            message: error.response.data.error,
            success: false,
          })
        );
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
          <div
            className="like-text"
            data-testid="like-text"
            style={{ display: "inline" }}
          >
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
        <button
          onClick={handleDeleteBlog}
          className="remove-button"
          style={removeButtonStyle}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;

import { useRef, useState } from "react";
import blogService from "../services/blogs";
import Togglable from "./Togglable";

const BlogForm = ({ handleNotification, setBlogs }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const blogFormRef = useRef();

  const handleCreate = async (event) => {
    event.preventDefault();

    const createdBlog = await blogService.create(newBlog);

    if (newBlog.title && newBlog.url) {
      setBlogs((prev) => [...prev, createdBlog]);
    }

    handleNotification(
      `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
      true
    );

    setNewBlog({ title: "", author: "", url: "" });

    blogFormRef.current.handleToggleVisible();
  };

  return (
    <div>
      <Togglable buttonLabel={`new blog`} ref={blogFormRef}>
        <h1>create new</h1>
        <form onSubmit={handleCreate} className={`blog-form-input`}>
          <label htmlFor="title">title:</label>
          <input
            data-testid="title"
            type="text"
            id="title"
            name="title"
            value={newBlog.title}
            onChange={(event) => {
              setNewBlog({ ...newBlog, title: event.target.value });
            }}
          />
          <br />
          <label htmlFor="author">author:</label>
          <input
            data-testid="author"
            type="text"
            id="author"
            name="author"
            value={newBlog.author}
            onChange={(event) =>
              setNewBlog({ ...newBlog, author: event.target.value })
            }
          />
          <br />
          <label htmlFor="url">url:</label>
          <input
            data-testid="url"
            type="text"
            id="url"
            name="url"
            value={newBlog.url}
            onChange={(event) =>
              setNewBlog({ ...newBlog, url: event.target.value })
            }
          />
          <br />
          <input data-testid="create-button" type="submit" value="create" />
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;

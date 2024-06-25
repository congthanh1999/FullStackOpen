import { useRef, useState } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { setNotificationThunk } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { styled, TextField } from "@mui/material";

const FormContainer = styled(`div`)({
  marginBottom: "1rem",
});

const StyledForm = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const StyledTextField = styled(TextField)({
  width: "33%",
});

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const handleCreate = async (event) => {
    event.preventDefault();

    let createdBlog = null;

    if (newBlog.title && newBlog.url) {
      createdBlog = await dispatch(createBlog(newBlog));
    }

    dispatch(
      setNotificationThunk({
        message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        success: true,
      })
    );

    setNewBlog({ title: "", author: "", url: "" });

    blogFormRef.current.handleToggleVisible();
  };

  return (
    <FormContainer>
      <Togglable
        buttonLabel={`new blog`}
        ref={blogFormRef}
        onClick={handleCreate}
      >
        <h1>create new</h1>
        <StyledForm className={`blog-form-input`}>
          <StyledTextField
            label="title"
            className="title"
            data-testid="title"
            type="text"
            id="title"
            name="title"
            value={newBlog.title}
            onChange={(event) => {
              setNewBlog({ ...newBlog, title: event.target.value });
            }}
          />
          <StyledTextField
            label="author"
            className="author"
            data-testid="author"
            type="text"
            id="author"
            name="author"
            value={newBlog.author}
            onChange={(event) =>
              setNewBlog({ ...newBlog, author: event.target.value })
            }
          />
          <StyledTextField
            label="url"
            className="url"
            data-testid="url"
            type="text"
            id="url"
            name="url"
            value={newBlog.url}
            onChange={(event) =>
              setNewBlog({ ...newBlog, url: event.target.value })
            }
          />
        </StyledForm>
      </Togglable>
    </FormContainer>
  );
};

export default BlogForm;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { changeBlog } from "../reducers/blogReducer";
import { Button, FormControl, TextareaAutosize } from "@mui/material";

const BlogComment = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = async (event) => {
    event.preventDefault();

    const updatedBlog = await blogService.comment(blog.id, comment);

    dispatch(changeBlog(updatedBlog));
    setComment("");
  };

  return (
    <>
      <h3>comments</h3>
      <form style={{ display: "flex", flexDirection: "row" }}>
        <TextareaAutosize
          minRows="3"
          value={comment}
          onChange={handleOnChange}
        />
        &nbsp;
        <div>
          <Button variant="contained" onClick={handleAddComment}>
            add comment
          </Button>
        </div>
        {/* <div>
          <input type="submit" value="add comment" />
        </div> */}
      </form>
      <ul>
        {blog.comments.map((comment, idx) => (
          <li key={idx}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

const BlogDetails = ({ blog }) => {
  const [likes, setLikes] = useState(null);
  const [isLoading, setIsLoading] = useState(!blog);
  const dispatch = useDispatch();

  useEffect(() => {
    if (blog) {
      setIsLoading(false);
      setLikes(blog.likes);
    }
  }, [blog]);

  if (isLoading) return null;

  const handleLikeBlog = async () => {
    setLikes((prev) => prev + 1);

    const updateContent = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    dispatch(updateBlog(updateContent));
  };

  return (
    <div>
      <h1>
        {blog.title}&nbsp;{blog.author}
      </h1>
      <a href="">{blog.url}</a>
      <div>
        likes {likes}{" "}
        <Button
          variant="contained"
          onClick={handleLikeBlog}
          sx={{
            padding: 0,
          }}
        >
          like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      <BlogComment blog={blog} />
    </div>
  );
};

export default BlogDetails;

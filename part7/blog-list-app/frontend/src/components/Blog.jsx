import { Link } from "react-router-dom";
import { styled } from "@mui/material";

const StyledBlog = styled(`div`)({
  padding: "1rem",
  border: "solid ",
  borderRadius: "1rem",
  borderWidth: 1,
  marginBottom: "1rem",
  boxShadow: "8px 8px 2px 1px rgba(24, 118, 209, .2)",
});

const Blog = ({ blog }) => {
  return (
    <StyledBlog className="blog">
      <div className="blog-summary">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        &nbsp;
      </div>
    </StyledBlog>
  );
};

export default Blog;

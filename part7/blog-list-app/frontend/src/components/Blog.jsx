import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-summary">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        &nbsp;
      </div>
    </div>
  );
};

export default Blog;

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "./reducers/blogReducer";
import { setUser, logout } from "./reducers/loginReducer";
import { Routes, Route, useMatch } from "react-router-dom";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import { fetchUsers } from "./reducers/userReducer";
import BlogDetails from "./components/BlogDetails";
import NavBar from "./components/NavBar";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);

  const match = useMatch("/users/:id");
  const matchedUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const matchedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  }, []);

  return (
    <div>
      {!user ? (
        <LoginForm
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <>
          <NavBar user={user} setErrorMessage={setErrorMessage} />
          <h2>blogs</h2>
          <Notification />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <BlogForm />
                  {blogs &&
                    blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
                </>
              }
            />
            <Route
              path="/blogs"
              element={
                <>
                  {" "}
                  <BlogForm />
                  {blogs &&
                    blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
                </>
              }
            />
            <Route
              path="/blogs/:id"
              element={<BlogDetails blog={matchedBlog} />}
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route
              path="/users/:id"
              element={<UserDetails user={matchedUser} />}
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;

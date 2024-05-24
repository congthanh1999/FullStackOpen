import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "./reducers/blogReducer";
import { setUser, logout } from "./reducers/loginReducer";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    setErrorMessage(null);
  };

  return (
    <div>
      {!user ? (
        <LoginForm
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.name} logged in{" "}
            <button
              className="logout-button"
              onClick={() => {
                dispatch(logout());
                setErrorMessage(null);
              }}
            >
              logout
            </button>
          </p>
          <BlogForm user={user} />
          {blogs && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
        </>
      )}
    </div>
  );
};

export default App;

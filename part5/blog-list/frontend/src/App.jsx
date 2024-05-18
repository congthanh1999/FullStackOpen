import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState("");
  const [success, setSuccess] = useState(null);
  const timeoutRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();

      setBlogs(blogs);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    setErrorMessage(null);
  };

  const handleNotification = (message, success) => {
    clearTimeout(timeoutRef.current);

    setNotification(message);
    setSuccess(success);

    timeoutRef.current = setTimeout(() => {
      setNotification(null);
      setSuccess(null);
    }, 5000);
  };

  return (
    <div>
      {!user ? (
        <LoginForm
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUser={setUser}
          timeoutRef={timeoutRef}
          handleNotification={handleNotification}
        />
      ) : (
        <>
          <h2>blogs</h2>
          <Notification
            message={notification}
            success={success}
            handleNotification={handleNotification}
          />
          <p>
            {user.name} logged in{" "}
            <button className="logout-button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <BlogForm
            handleNotification={handleNotification}
            setBlogs={setBlogs}
            user={user}
          />
          {blogs &&
            blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                setBlogs={setBlogs}
                handleNotification={handleNotification}
                user={user}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default App;

import loginService from "../services/login";
import Notification from "./Notification";
import { useState } from "react";
import blogService from "../services/blogs";

const LoginForm = ({
  errorMessage,
  setErrorMessage,
  setUser,
  timeoutRef,
  handleNotification,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);
      setErrorMessage(`${user.username} is logged in`);
      setUsername("");
      setPassword("");
      handleNotification("logged in successfully", true);
    } catch (exception) {
      clearTimeout(timeoutRef.current);

      setErrorMessage("wrong credentials");

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Login to application</h1>
      <Notification message={errorMessage} success={false} />
      <form onSubmit={handleSubmit} data-testid="login-form">
        <label htmlFor="username">username: </label>
        <input
          className="username"
          data-testid="username"
          type="text"
          id="uername"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label htmlFor="password">password: </label>
        <input
          className="password"
          data-testid="password"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input
          className="login-button"
          type="submit"
          value="login"
          data-testid="submit-button"
        />
      </form>
    </div>
  );
};

export default LoginForm;

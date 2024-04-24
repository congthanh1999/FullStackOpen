import loginService from "../services/login";
import Notification from "./Notification";
import { useState } from "react";

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username: </label>
        <input
          type="text"
          id="uername"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label htmlFor="password">password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input type="submit" value="login" />
      </form>
    </div>
  );
};

export default LoginForm;

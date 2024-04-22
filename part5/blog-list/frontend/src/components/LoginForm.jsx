import React, { useRef } from "react";
import loginService from "../services/login";
import Notification from "./Notification";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  errorMessage,
  setErrorMessage,
  setUser,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);

      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleOnChange = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <div>
      <h1>Login to application</h1>
      <Notification message={errorMessage} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username: </label>
        <input
          type="text"
          id="uername"
          name="username"
          value={username}
          onChange={(event) => handleOnChange(event, setUsername)}
        />
        <br />
        <label htmlFor="password">password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => handleOnChange(event, setPassword)}
        />
        <br />
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;

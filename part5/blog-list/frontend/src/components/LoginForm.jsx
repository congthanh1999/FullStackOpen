import React from "react";

const LoginForm = ({ username, password }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor=""></label>
      <input type="text" />
    </form>
  );
};

export default LoginForm;

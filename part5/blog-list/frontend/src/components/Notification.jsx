const Notification = ({ message, buttonOn }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
  };

  return (
    <p>
      {message}{" "}
      {buttonOn ? <button onClick={handleLogout}>logout</button> : null}
    </p>
  );
};

export default Notification;

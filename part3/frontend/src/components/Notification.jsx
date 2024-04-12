const Notification = ({ message, color }) => {
  const style = { border: `4px solid ${color}`, color: color };

  return (
    <h3
      className={`notification ${message ? "active" : ""}`}
      style={message ? style : {}}
    >
      {message}
    </h3>
  );
};

export default Notification;

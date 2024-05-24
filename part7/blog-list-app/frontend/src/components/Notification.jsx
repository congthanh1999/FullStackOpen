import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <h1
      className={`notification ${notification.message ? `active` : ``} ${
        notification.success ? `success` : `unsuccess`
      }`}
    >
      {notification.message}
    </h1>
  );
};

export default Notification;

import NotificationContext from "../contexts/NotificationContext";
import { useContext } from "react";

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  // if (true) return null;

  return <div style={notification ? style : null}>{notification}</div>;
};

export default Notification;

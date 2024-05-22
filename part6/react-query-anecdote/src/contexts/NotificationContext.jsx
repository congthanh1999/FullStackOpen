/* eslint-disable react/prop-types */
import { useReducer, createContext, useEffect } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `you voted ${action.payload}`;
    case "CREATE":
      return `you created ${action.payload}`;
    case "ERROR":
      return action.payload;
    case "RESET":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: "RESET" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

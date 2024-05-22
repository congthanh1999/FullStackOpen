/* eslint-disable react/prop-types */
import { useReducer, createContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `you voted ${action.payload.content}`;
    case "CREATE":
      return `you created ${action.payload.content}`;
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

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import blogReducer from "./blogReducer";
import loginReducer from "./loginReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    login: loginReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
    resetNotification() {
      return null;
    },
  },
});

export const { changeNotification, resetNotification } =
  notificationSlice.actions;

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch(changeNotification(message));
    setTimeout(() => {
      dispatch(resetNotification());
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;

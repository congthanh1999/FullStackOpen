import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    success: null,
  },
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification() {
      return { message: null, success: null };
    },
  },
});

export const { setNotification, resetNotification } = notificationSlice.actions;

export const setNotificationThunk = (object) => {
  return async (dispatch) => {
    dispatch(setNotification(object));
    const timer = setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);

    return () => clearTimeout(timer);
  };
};

export default notificationSlice.reducer;

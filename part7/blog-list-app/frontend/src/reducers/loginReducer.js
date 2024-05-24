import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const { setUser, clearUser } = loginSlice.actions;

export const login = (loginObject) => {
  return async (dispatch) => {
    const user = await loginService.login(loginObject);
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    dispatch(setUser(user));
    return user;
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    dispatch(clearUser());
  };
};

export default loginSlice.reducer;

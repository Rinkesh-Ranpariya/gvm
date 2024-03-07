import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userInfo: {
    email: "",
    name: "",
    contactNumber: "",
    password: "",
    role: "",
    userId: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { values, allUsers } = action.payload;
      const userData = allUsers.find((user) => user.email === values.email);
      if (userData && userData.password === values.password) {
        state.isAuthenticated = true;
        state.userInfo = userData;
        localStorage.setItem("userToken", values.email);
        action.payload = userData;
      } else {
        action.payload = false;
      }
    },
    loginWithToken: (state, action) => {
      const { token, allUsers } = action.payload;
      const userData = allUsers.find((user) => user.email === token);
      if (userData) {
        state.isAuthenticated = true;
        state.userInfo = userData;
        action.payload = true;
      } else {
        state = initialState;
        localStorage.removeItem("userToken");
        action.payload = false;
      }
    },
    logout: (state) => {
      state = initialState;
      localStorage.removeItem("userToken");
    },
  },
});

export const { login, loginWithToken, logout } = userSlice.actions;
export default userSlice.reducer;

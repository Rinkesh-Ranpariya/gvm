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
    cart: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userCart: (state) => {
      const appUsers = JSON.parse(localStorage.getItem("AppUsers"));
      const user = appUsers.find(
        (user) => user.userId === state.userInfo.userId
      );
      state.userInfo = user;
    },
    clearUserCart: (state) => {
      state.userInfo.cart = [];
    },
    removeCartItemByIdFromUser: (state, { payload }) => {
      state.userInfo.cart = state.userInfo.cart.filter(
        (item) => item.productId !== payload
      );
    },
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
        action.payload = JSON.parse(JSON.stringify(userData));
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

export const {
  userCart,
  removeCartItemByIdFromUser,
  login,
  loginWithToken,
  logout,
  clearUserCart,
} = userSlice.actions;
export default userSlice.reducer;

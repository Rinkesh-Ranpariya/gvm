import { createSlice } from "@reduxjs/toolkit";

const storedUsers = localStorage.getItem("AppUsers");

const initialState = {
  allUsers: storedUsers ? JSON.parse(storedUsers) : [],
};

export const usersManagementSlice = createSlice({
  name: "users management",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newUserList = state.allUsers.map((user) => {
        if (user.userId === action.payload.userId) {
          return { ...user, cart: [...user?.cart, action.payload.productId] };
        }
        return user;
      });
      state.allUsers = newUserList;
      localStorage.setItem("AppUsers", JSON.stringify(newUserList));
    },
    addUser: (state, action) => {
      const isUserExist = state.allUsers.find(
        (user) => user.email === action.payload.email
      );
      if (!isUserExist) {
        const newUserList = [...state.allUsers, action.payload];
        state.allUsers = newUserList;
        localStorage.setItem("AppUsers", JSON.stringify(newUserList));
        action.payload = true;
      } else {
        action.payload = false;
      }
    },
  },
});

export const { addToCart, addUser } = usersManagementSlice.actions;
export default usersManagementSlice.reducer;

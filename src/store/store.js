import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import usersManagementReducer from "./usersManagement/usersManagementSlice";
import productsManagementReducer from "./productsManagement/productsManagementSlice";

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    usersManagement: usersManagementReducer,
    productsManagement: productsManagementReducer,
  },
});

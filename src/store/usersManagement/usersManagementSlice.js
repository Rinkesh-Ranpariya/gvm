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
          const productExist = user.cart.findIndex(
            (item) => item.productId === action.payload.productId
          );

          if (productExist === -1) {
            return {
              ...user,
              cart: [
                ...user?.cart,
                { productId: action.payload.productId, count: 1 },
              ],
            };
          } else {
            const copyCart = user?.cart;
            const copyProduct = {
              ...copyCart[productExist],
              count: copyCart[productExist].count + 1,
            };

            copyCart.splice(productExist, 1, copyProduct);

            return {
              ...user,
              cart: copyCart,
            };
          }
        }
        return user;
      });
      state.allUsers = newUserList;
      localStorage.setItem("AppUsers", JSON.stringify(newUserList));
    },
    removeCartItemByIdFromAllUser: (state, { payload }) => {
      const updatedAppUsers = state.allUsers.map((user) => {
        if (user.userId === payload.userId) {
          return {
            ...user,
            cart: user?.cart.filter(
              (item) => item.productId !== payload.productId
            ),
          };
        }
        return user;
      });
      state.allUsers = updatedAppUsers;
      localStorage.setItem("AppUsers", JSON.stringify(updatedAppUsers));
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
    addAnalytics: (state, { payload }) => {
      const newUserList = state.allUsers.map((user) => {
        if (user.role === "seller") {
          const analytics = user.analytics;
          const products = payload.filter(
            (prod) => prod.userId === user.userId
          );
          products.map((item) => {
            const isExist = analytics.findIndex(
              (ele) => ele.productId === item.productId
            );
            if (isExist === -1) {
              analytics.push({
                name: item.name,
                productId: item.productId,
                count: item.count,
              });
            } else {
              const newObj = analytics[isExist];
              analytics.splice(isExist, 1, {
                ...newObj,
                name: item.name,
                count: newObj.count + item.count,
              });
            }
          });
          return { ...user, analytics };
        }
        return user;
      });
      state.allUsers = newUserList;
      localStorage.setItem("AppUsers", JSON.stringify(newUserList));
    },
    clearCartData: (state, { payload }) => {
      const updatedAppUsers = state.allUsers.map((user) => {
        if (user.userId === payload) {
          return {
            ...user,
            cart: [],
          };
        }
        return user;
      });
      state.allUsers = updatedAppUsers;
      localStorage.setItem("AppUsers", JSON.stringify(updatedAppUsers));
    },
  },
});

export const {
  addToCart,
  addUser,
  removeCartItemByIdFromAllUser,
  addAnalytics,
  clearCartData,
} = usersManagementSlice.actions;
export default usersManagementSlice.reducer;

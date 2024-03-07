import { createSlice } from "@reduxjs/toolkit";

const storedProducts = localStorage.getItem("AppProducts");

const initialState = {
  allProducts: storedProducts ? JSON.parse(storedProducts) : [],
  userProducts: [],
};

export const productsManagementSlice = createSlice({
  name: "products management",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProductList = [...state.allProducts, action.payload];
      state.allProducts = newProductList;
      localStorage.setItem("AppProducts", JSON.stringify(newProductList));
    },
    getProductsByUser: (state) => {
      const id = localStorage.getItem("userToken");
      const products = state.allProducts.filter((prod) => prod.userId === id);
      state.userProducts = products;
    },
    deleteProduct: (state, action) => {
      console.log();
      const products = state.allProducts.filter(
        (prod) => prod.productId !== action.payload
      );
      localStorage.setItem("AppProducts", JSON.stringify(products));
      state.allProducts = products;
    },
    editProduct: (state, action) => {
      const newProductList = state.allProducts.map((prod) => {
        if (prod.productId === action.payload.productId) {
          return { ...action.payload };
        }
        return prod;
      });
      state.allProducts = newProductList;
      localStorage.setItem("AppProducts", JSON.stringify(newProductList));
    },
  },
});

export const { addProduct, getProductsByUser, deleteProduct, editProduct } =
  productsManagementSlice.actions;
export default productsManagementSlice.reducer;

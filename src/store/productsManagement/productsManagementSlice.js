import { createSlice } from "@reduxjs/toolkit";

const storedProducts = localStorage.getItem("AppProducts");

const initialState = {
  allProducts: storedProducts ? JSON.parse(storedProducts) : [],
  userProducts: [],
  filteredProducts: storedProducts ? JSON.parse(storedProducts) : [],
};

export const productsManagementSlice = createSlice({
  name: "products management",
  initialState,
  reducers: {
    filterProducts: (state, { payload }) => {
      const products = state.allProducts.filter((prod) => {
        const { name, desc, price, category } = prod;

        if (!payload.searchText && payload.category === "All") {
          return true;
        }
        if (
          [name, desc, price].find((ele) => ele.includes(payload.searchText)) &&
          (payload.category === "All" || category === payload.category)
        ) {
          return true;
        }
      });
      state.filteredProducts = products;
    },
    addProduct: (state, action) => {
      const products = [...state.allProducts, action.payload];
      state.allProducts = products;
      localStorage.setItem("AppProducts", JSON.stringify(products));
    },
    getProductsBySellerId: (state, { payload }) => {
      const products = state.allProducts.filter(
        (prod) => prod.userId === payload
      );
      state.userProducts = products;
    },
    getProductsByProductIds: (state, action) => {
      const { payload } = action;
      const ids = payload.map((item) => item.productId);
      const products = state.allProducts.filter((prod) => {
        const isExist = ids.includes(prod.productId);
        return isExist;
      });
      const newProduct = products.map((prod) => {
        return {
          ...prod,
          count: payload.find((item) => item.productId === prod.productId)
            .count,
        };
      });
      action.payload = JSON.parse(JSON.stringify(newProduct));
    },
    deleteProduct: (state, action) => {
      const products = state.allProducts.filter(
        (prod) => prod.productId !== action.payload
      );
      state.allProducts = products;
      localStorage.setItem("AppProducts", JSON.stringify(products));
    },
    editProduct: (state, action) => {
      const products = state.allProducts.map((prod) => {
        if (prod.productId === action.payload.productId) {
          return { ...action.payload };
        }
        return prod;
      });
      state.allProducts = products;
      localStorage.setItem("AppProducts", JSON.stringify(products));
    },
    getProductById: (state, action) => {
      const productInfo = state.allProducts.find(
        (prod) => prod.productId === action.payload
      );

      action.payload = JSON.parse(JSON.stringify(productInfo));
    },
  },
});

export const {
  addProduct,
  filterProducts,
  getProductsBySellerId,
  deleteProduct,
  editProduct,
  getProductsByProductIds,
  getProductById,
} = productsManagementSlice.actions;
export default productsManagementSlice.reducer;

import Analytics from "../components/seller/Analytics";
import Cart from "../components/customer/Cart";
import Login from "../components/Login";
import PageNotFound from "../components/PageNotFound";
import Products from "../components/customer/Products";
import SellerProducts from "../components/seller/SellerProducts";
import Signup from "../components/Signup";
import RequireCustomerAuth from "../components/common/RequireCustomerAuth";
import RequireSellerAuth from "../components/common/RequireSellerAuth";
import Home from "../components/Home";
import Payment from "../components/customer/Payment";
import ViewProduct from "../components/customer/ViewProduct";

export const commonRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export const customerRoutes = [
  {
    path: "/products",
    element: (
      <RequireCustomerAuth>
        <Products />
      </RequireCustomerAuth>
    ),
  },
  {
    path: "/product/:productId",
    element: (
      <RequireCustomerAuth>
        <ViewProduct />
      </RequireCustomerAuth>
    ),
  },
  {
    path: "/cart",
    element: (
      <RequireCustomerAuth>
        <Cart />
      </RequireCustomerAuth>
    ),
  },
  {
    path: "/payment",
    element: (
      <RequireCustomerAuth>
        <Payment />
      </RequireCustomerAuth>
    ),
  },
  ...commonRoutes,
];

export const sellerRoutes = [
  {
    path: "/seller/products",
    element: (
      <RequireSellerAuth>
        <SellerProducts />
      </RequireSellerAuth>
    ),
  },
  {
    path: "/seller/analytics",
    element: (
      <RequireSellerAuth>
        <Analytics />
      </RequireSellerAuth>
    ),
  },
  ...commonRoutes,
];

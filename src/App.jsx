import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import SellerProducts from "./components/SellerProducts";
import RequireSellerAuth from "./components/common/RequireSellerAuth";
import RequireCustomerAuth from "./components/common/RequireCustomerAuth";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Analytics from "./components/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireCustomerAuth>
        <Products />
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
    path: "/seller/products",
    element: (
      <RequireSellerAuth>
        <SellerProducts />
      </RequireSellerAuth>
    ),
  },
  {
    path: "/analytics",
    element: (
      <RequireSellerAuth>
        <Analytics />
      </RequireSellerAuth>
    ),
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
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;

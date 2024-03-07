import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonRoutes, customerRoutes, sellerRoutes } from "./routes/routes";
import { loginWithToken } from "./store/user/userSlice";

function App() {
  const dispatch = useDispatch();

  const [router, setRouter] = useState(commonRoutes);

  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const allUsers = useSelector((state) => state.usersManagement.allUsers);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(loginWithToken({ token, allUsers }));
    }
  }, []);

  useEffect(() => {
    if (userInfo.role === "customer") {
      setRouter(customerRoutes);
    } else {
      setRouter(sellerRoutes);
    }
  }, [userInfo.userId]);

  return (
    <div>
      <RouterProvider router={createBrowserRouter(router)} />
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

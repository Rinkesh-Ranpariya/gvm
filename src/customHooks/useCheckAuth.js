import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginWithToken } from "../store/user/userSlice";

const useCheckAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(
    !!localStorage.getItem("userToken")
  );

  const allUsers = useSelector((state) => state.usersManagement.allUsers);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const { payload: userData } = dispatch(
        loginWithToken({ token, allUsers })
      );
      if (userData.role) {
        if (
          location.state?.currentPath &&
          !["login", "register"].includes(location.state?.currentPath)
        ) {
          navigate(location.state?.currentPath);
        } else {
          if (userData.role === "customer") {
            navigate("/products");
          } else {
            navigate("/seller/products");
          }
        }
      }
    }
    setIsLoading(false);
  }, []);

  return isLoading;
};

export default useCheckAuth;

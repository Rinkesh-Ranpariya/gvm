import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithToken } from "../store/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allUsers = useSelector((state) => state.usersManagement.allUsers);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const { payload: userData } = dispatch(
        loginWithToken({ token, allUsers })
      );

      if (userData.role === "customer") {
        navigate("/products");
      } else {
        navigate("/seller/products");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Home</div>;
};

export default Home;

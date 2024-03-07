import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./Layout";

const RequireSellerAuth = ({ children }) => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const token = localStorage.getItem("userToken");

  if (userInfo.role !== "seller" || !token) {
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{ currentPath: location.pathname, role: "seller" }}
      />
    );
  }

  return <Layout>{children}</Layout>;
};

export default RequireSellerAuth;

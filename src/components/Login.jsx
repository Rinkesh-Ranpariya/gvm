import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/user/userSlice";
import useCheckAuth from "../customHooks/useCheckAuth";
import { toastHandler } from "../utils/toast";
import Loading from "./common/Loading";
import { TextField } from "@mui/material";

const Login = () => {
  const isLoading = useCheckAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allUsers = useSelector((state) => state.usersManagement.allUsers);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object().shape({
        email: yup.string().required("email is required"),
        password: yup.string().required("password is required"),
      }),
      onSubmit: (values) => {
        const { payload: userData } = dispatch(login({ values, allUsers }));
        if (userData.email) {
          if (userData.role === "customer") {
            navigate("/products");
          } else {
            navigate("/seller/products");
          }
        } else {
          toastHandler("Invalid email or password!", "error");
        }
      },
    });

  const handleClickSignup = () => {
    navigate("/register");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      <div className="fixed h-full w-full flex -z-10">
        <div className="flex-1 bg-[#ECBC76]"></div>
        <div className="max-[768px]:hidden flex-1 bg-[#FFFEF9]"></div>
      </div>

      <div className="relative bg-white rounded-3xl p-9 max-[426px]:px-5 max-[426px]:py-10 mx-5 max-w-lg w-full shadow-lg">
        <div className="flex justify-between">
          <div>Welcome to lorem</div>
          <div className="text-sm">
            <div className="text-gray-500">No Account ?</div>
            <div
              className="text-[#B87514] cursor-pointer"
              onClick={handleClickSignup}
            >
              Sign up
            </div>
          </div>
        </div>

        <div className="text-4xl mb-9 max-[426px]:mb-14 font-semibold">
          Sign in
        </div>

        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <div className="mb-2 text-sm">Enter your email address</div>
            <TextField
              size="small"
              className="mb-3 w-full"
              name="email"
              type="text"
              id="email"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <div className="h-4 text-xs text-red-500">
              {touched.email ? errors.email : ""}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm">Enter your Password</div>
            <TextField
              size="small"
              className="mb-3 w-full"
              name="password"
              type="password"
              id="password"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <div className="h-4 text-xs text-red-500">
              {touched.password ? errors.password : ""}
            </div>
          </div>

          <div className="text-right text-xs text-[#AD3113] cursor-pointer">
            Forgot Password
          </div>

          <button
            type="submit"
            className="text-sm mt-6 py-3 w-full rounded-lg bg-[#E48700] text-white cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

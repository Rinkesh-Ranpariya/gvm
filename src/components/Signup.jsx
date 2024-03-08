import { MenuItem, Select, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "../store/usersManagement/usersManagementSlice";
import useCheckAuth from "../customHooks/useCheckAuth";
import Loading from "./common/Loading";
import { toastHandler } from "../utils/toast";

const Signup = () => {
  const isLoading = useCheckAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        name: "",
        contactNumber: "",
        password: "",
        role: "customer",
      },
      validationSchema: yup.object().shape({
        email: yup.string().email().required("email is required"),
        name: yup.string().required("name is required"),
        contactNumber: yup
          .string()
          .matches(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            "contact number is not valid"
          )
          .required("contact number is required"),
        password: yup.string().required("password is required"),
      }),
      onSubmit: (values) => {
        if (values.role === "customer") {
          values.cart = [];
        }
        const { payload: isUserAdded } = dispatch(
          addUser({ ...values, userId: `userId-${uuidv4()}` })
        );
        if (isUserAdded) {
          toastHandler(
            "Thanks for signing up. Your account has been created.",
            "success"
          );
          navigate("/login");
        } else {
          toastHandler("User already exists!", "error");
        }
      },
    });

  const handleClickSignin = () => {
    navigate("/login");
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
            <div className="text-gray-500">Have an Account ?</div>
            <div
              className="text-[#B87514] cursor-pointer"
              onClick={handleClickSignin}
            >
              Sign in
            </div>
          </div>
        </div>

        <div className="text-4xl mb-9 max-[426px]:mb-14 font-semibold">
          Sign up
        </div>

        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <div className="mb-2 text-sm">Enter your email address</div>
            <TextField
              size="small"
              className="mb-3 w-full"
              name="email"
              type="email"
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

          <div className="flex my-2 gap-4">
            <div className="flex-1">
              <div className="mb-2 text-sm">User name</div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="name"
                type="text"
                id="name"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <div className="h-4 text-xs text-red-500">
                {touched.name ? errors.name : ""}
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-2 text-sm">Contact Number</div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="contactNumber"
                type="text"
                id="contactNumber"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contactNumber}
              />
              <div className="h-4 text-xs text-red-500">
                {touched.contactNumber ? errors.contactNumber : ""}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm">Choose your role</div>
            <Select
              size="small"
              className="mb-3 w-full"
              variant="outlined"
              id="role"
              name="role"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.role}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
            </Select>
            <div className="h-4 text-xs text-red-500">
              {touched.role ? errors.role : ""}
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

          <button
            type="submit"
            className="text-sm mt-2 py-3 w-full rounded-lg bg-[#E48700] text-white cursor-pointer"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

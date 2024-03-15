import { useDispatch, useSelector } from "react-redux";
import { getProductsByProductIds } from "../../store/productsManagement/productsManagementSlice";
import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import {
  addAnalytics,
  clearCartData,
} from "../../store/usersManagement/usersManagementSlice";
import { clearUserCart } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState([]);

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    const products = dispatch(getProductsByProductIds([...userInfo.cart]));
    setCartProducts(products.payload);
  }, [userInfo.cart]);

  const handleClickPay = () => {
    dispatch(addAnalytics(cartProducts));
    dispatch(clearCartData(userInfo.userId));
    dispatch(clearUserCart());
    navigate("/");
  };

  return (
    <div>
      {cartProducts.map((prod) => (
        <div
          key={prod.productId}
          className="flex justify-between border-2 p-5 my-2"
        >
          <div className="text-4xl">{prod.name}</div>
          <div className="flex items-center gap-4">
            <div className="border-r-2 pr-4">
              <div>Price: ${prod.price}</div>
              <div>
                Quantity: <span className="font-bold">{prod.count}</span>
              </div>
            </div>

            <div>
              {prod.price} x {prod.count}
            </div>
          </div>
        </div>
      ))}

      <div className="text-right text-2xl border-2 p-5 my-2">
        Total: $
        {cartProducts.reduce((sum, ele) => {
          return sum + ele.price * ele.count;
        }, 0)}
      </div>

      <div className="flex justify-end">
        <Button variant="contained" size="small" onClick={handleClickPay}>
          Pay
        </Button>
      </div>
    </div>
  );
};

export default Payment;

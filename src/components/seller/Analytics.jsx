import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByProductIds } from "../../store/productsManagement/productsManagementSlice";

const Analytics = () => {
  const dispatch = useDispatch();

  const [cartProducts, setCartProducts] = useState([]);

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    const products = dispatch(getProductsByProductIds([...userInfo.analytics]));
    setCartProducts(products.payload);
  }, [userInfo.cart]);

  return (
    <div>
      <div className="text-3xl font-bold mb-10">Analytics</div>
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
                  Total purchase:{" "}
                  <span className="font-bold">{prod.count}</span>
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
      </div>
    </div>
  );
};

export default Analytics;

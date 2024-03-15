import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getProductById } from "../../store/productsManagement/productsManagementSlice";
import { addToCart } from "../../store/usersManagement/usersManagementSlice";
import { userCart } from "../../store/user/userSlice";
import { toastHandler } from "../../utils/toast";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [productInfo, setProductInfo] = useState({});

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    const data = dispatch(getProductById(params.productId));
    setProductInfo(data.payload);
  }, []);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ userId: userInfo.userId, productId }));
    dispatch(userCart());
    toastHandler("Product added in cart!", "success");
  };

  return (
    <div className="flex justify-center gap-5 max-[768px]:flex-col">
      <div className="flex-1">
        <div className="shadow-md">
          <img src={productInfo.img} alt="product" />
        </div>
      </div>
      <div className="flex-1">
        <section className="description">
          <div>
            <p className="pre">{productInfo.brand}</p>
            <p>{productInfo.category}</p>
          </div>
          <h1>{productInfo.name}</h1>
          <p className="desc">{productInfo.desc}</p>
          <div className="price">
            <div className="main-tag">
              <p>${productInfo.price}</p>
              <p>{productInfo.discountPercentage}%</p>
            </div>
          </div>

          <Rating name="read-only" value={productInfo.rating} readOnly />
          <div className="buttons">
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(productInfo.productId)}
            >
              <ShoppingCartIcon />
              add to cart
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewProduct;

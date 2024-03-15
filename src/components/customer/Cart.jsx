import { useDispatch, useSelector } from "react-redux";
import { getProductsByProductIds } from "../../store/productsManagement/productsManagementSlice";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { removeCartItemByIdFromUser } from "../../store/user/userSlice";
import { toastHandler } from "../../utils/toast";
import { removeCartItemByIdFromAllUser } from "../../store/usersManagement/usersManagementSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState([]);

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    const products = dispatch(getProductsByProductIds([...userInfo.cart]));
    setCartProducts(products.payload);
  }, [userInfo.cart]);

  const handleRemoveItemFromCart = (productId) => {
    dispatch(
      removeCartItemByIdFromAllUser({ userId: userInfo.userId, productId })
    );
    dispatch(removeCartItemByIdFromUser(productId));
    toastHandler("Product removed from cart!", "success");
  };

  return (
    <div>
      {!!cartProducts?.length && (
        <>
          <div className="flex justify-end">
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate("/payment")}
            >
              Checkout & Payment
            </Button>
          </div>

          <Grid container spacing={2}>
            {cartProducts.map((prod) => (
              <Grid key={prod.productId} item xs={12} md={3}>
                <Card className="m-3">
                  <div className="h-60">
                    <img
                      src={prod.img}
                      alt="productImage"
                      className="w-full h-full"
                    />
                  </div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {prod.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      $ {prod.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {prod.desc}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity <span className="font-bold">{prod.count}</span>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/product/${prod.productId}`)}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleRemoveItemFromCart(prod.productId)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {!cartProducts?.length && <>Empty cart!</>}
    </div>
  );
};

export default Cart;

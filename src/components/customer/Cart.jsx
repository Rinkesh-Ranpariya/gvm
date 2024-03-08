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
import { removeCartItemById } from "../../store/user/userSlice";
import { toastHandler } from "../../utils/toast";

const Cart = () => {
  const dispatch = useDispatch();

  const [cartProducts, setCartProducts] = useState([]);

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    const products = dispatch(getProductsByProductIds([...userInfo.cart]));
    setCartProducts(products.payload);
  }, [userInfo.cart]);

  const handleRemoveItemFromCart = (itemId) => {
    dispatch(removeCartItemById(itemId));
    const token = localStorage.getItem("userToken");
    const appUsers = JSON.parse(localStorage.getItem("AppUsers"));
    const updatedAppUsers = appUsers.map((user) => {
      if (user.email === token) {
        return { ...user, cart: user?.cart.filter((id) => id !== itemId) };
      }
      return user;
    });
    localStorage.setItem("AppUsers", JSON.stringify(updatedAppUsers));
    toastHandler("Product removed from cart!", "success");
  };

  return (
    <div>
      <Grid container spacing={2}>
        {!!cartProducts?.length &&
          cartProducts.map((prod) => (
            <Grid key={prod.productId} item xs={12} md={3}>
              <Card className="m-3">
                <div className="h-60">
                  <img src={prod.img} className="w-full h-full" />
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
                </CardContent>
                <CardActions>
                  <Button variant="contained" size="small">
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
      {!cartProducts?.length && <>Empty cart!</>}
    </div>
  );
};

export default Cart;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { filterProducts } from "../../store/productsManagement/productsManagementSlice";
import { addToCart } from "../../store/usersManagement/usersManagementSlice";
import { userCart } from "../../store/user/userSlice";
import { toastHandler } from "../../utils/toast";

const Products = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");

  const products = useSelector(
    (state) => state.productsManagement.filteredProducts
  );
  const allProducts = useSelector(
    (state) => state.productsManagement.allProducts
  );
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    dispatch(filterProducts({ searchText, category }));
  }, [allProducts]);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    dispatch(filterProducts({ searchText: e.target.value, category }));
  };

  const handleChangecategory = (e) => {
    setCategory(e.target.value);
    dispatch(filterProducts({ category: e.target.value, searchText }));
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ userId: userInfo.userId, productId }));
    dispatch(userCart(productId));
    toastHandler("Product added in cart!", "success");
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="max-w-64 w-full">
          <div className="mb-1 text-sm">Search</div>
          <TextField
            size="small"
            className="w-full"
            name="searchText"
            type="text"
            id="searchText"
            variant="outlined"
            value={searchText}
            onChange={handleSearchText}
          />
        </div>
        <div className="max-w-64 w-full">
          <div className="mb-1 text-sm">Category</div>
          <Select
            size="small"
            className="w-full"
            name="category"
            id="category"
            variant="outlined"
            value={category}
            onChange={handleChangecategory}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Food and beverage">Food and beverage</MenuItem>
            <MenuItem value="Groceries">Groceries</MenuItem>
            <MenuItem value="Books">Books</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Furniture">Furniture</MenuItem>
            <MenuItem value="Jewellery">Jewellery</MenuItem>
          </Select>
        </div>
      </div>

      <div className="mt-14">
        <Grid container spacing={2}>
          {!!products?.length &&
            products.map((prod) => (
              <Grid item xs={12} md={3}>
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
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleAddToCart(prod.productId)}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="contained" size="small">
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
        {!products?.length && <>No products found!</>}
      </div>
    </div>
  );
};

export default Products;

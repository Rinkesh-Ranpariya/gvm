import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  editProduct,
} from "../../store/productsManagement/productsManagementSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditProduct = ({ handleClose, editProductData }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const [product, setProduct] = useState({
    name: "",
    img: "",
    desc: "",
    price: 0,
    category: "",
    brand: "",
    discountPercentage: 0,
    rating: 4,
    userId: userInfo.userId,
    productId: `productId-${uuidv4()}`,
  });

  useEffect(() => {
    if (editProductData.productId) {
      setProduct({ ...editProductData });
    }
  }, [editProductData.productId]);

  const handleAddProduct = () => {
    if (editProductData.productId) {
      dispatch(editProduct(product));
    } else {
      dispatch(addProduct(product));
    }
    handleClose();
  };

  const handleChangeProductData = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editProductData.productId ? "Edit Product" : "Add Product"}
          </Typography>

          <div className="grid grid-cols-2 gap-2">
            <div className="my-4">
              <div className="mb-1 text-sm">Enter name</div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="name"
                type="text"
                id="name"
                variant="outlined"
                onChange={handleChangeProductData}
                value={product.name}
              />
            </div>

            <div className="my-3">
              <div className="mb-1 text-sm">Enter image url</div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="img"
                type="text"
                id="img"
                variant="outlined"
                value={product.img}
                onChange={handleChangeProductData}
              />
            </div>

            <div className="my-3">
              <div className="mb-1 text-sm">Enter description</div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="desc"
                type="text"
                id="desc"
                variant="outlined"
                value={product.desc}
                onChange={handleChangeProductData}
              />
            </div>

            <div className="my-3">
              <div className="mb-1 text-sm">Enter category</div>
              <Select
                size="small"
                className="mb-3 w-full"
                id="category"
                name="category"
                variant="outlined"
                value={product.category}
                onChange={handleChangeProductData}
              >
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Food and beverage">Food and beverage</MenuItem>
                <MenuItem value="Groceries">Groceries</MenuItem>
                <MenuItem value="Books">Books</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Furniture">Furniture</MenuItem>
                <MenuItem value="Jewellery">Jewellery</MenuItem>
              </Select>
            </div>

            <div className="my-3">
              <div className="mb-1 text-sm">Enter price</div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="price"
                type="number"
                id="price"
                variant="outlined"
                value={product.price}
                onChange={handleChangeProductData}
              />
            </div>

            <div className="my-3">
              <div className="mb-1 text-sm">Enter brand</div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="brand"
                type="text"
                id="brand"
                variant="outlined"
                value={product.brand}
                onChange={handleChangeProductData}
              />
            </div>

            <div className="my-3">
              <div className="mb-1 text-sm">Enter discount %</div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="discountPercentage"
                type="number"
                id="discountPercentage"
                variant="outlined"
                value={product.discountPercentage}
                onChange={handleChangeProductData}
              />
            </div>

            <div className="my-3">
              <div className="mb-1 text-sm">Enter rating</div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="rating"
                type="number"
                id="rating"
                variant="outlined"
                value={product.rating}
                onChange={handleChangeProductData}
              />
            </div>
          </div>

          <div className="mt-10">
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <span className="ml-2">
              <Button variant="contained" onClick={handleAddProduct}>
                {editProductData.productId ? "Edit" : "Add"}
              </Button>
            </span>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditProduct;

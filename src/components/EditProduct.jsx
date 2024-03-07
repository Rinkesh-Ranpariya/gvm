import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addProduct,
  editProduct,
} from "../store/productsManagement/productsManagementSlice";

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

  const [product, setProduct] = React.useState({
    name: "",
    img: "",
    desc: "",
    price: 0,
    userId: localStorage.getItem("userToken"),
    productId: `prod-${new Date().toLocaleString()}`,
  });

  React.useEffect(() => {
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

  const handleChangeProduct = (e) => {
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
            Add Product
          </Typography>

          <div className="my-3">
            <TextField
              size="small"
              className="mb-3 w-full"
              name="name"
              type="text"
              id="name"
              label="Name"
              variant="outlined"
              onChange={handleChangeProduct}
              value={product.name}
            />
          </div>
          <div className="my-3">
            <TextField
              size="small"
              className="mb-3 w-full"
              name="img"
              type="text"
              id="img"
              label="Image"
              variant="outlined"
              value={product.img}
              onChange={handleChangeProduct}
            />
          </div>
          <div className="my-3">
            <TextField
              size="small"
              className="mb-3 w-full"
              name="desc"
              type="text"
              id="desc"
              label="Desc"
              variant="outlined"
              value={product.desc}
              onChange={handleChangeProduct}
            />
          </div>
          <div className="my-3">
            <TextField
              size="small"
              className="mb-3 w-full"
              name="price"
              type="text"
              id="price"
              label="Price"
              variant="outlined"
              value={product.price}
              onChange={handleChangeProduct}
            />
          </div>

          <div>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddProduct}>
              {editProductData.productId ? "Edit" : "Add"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditProduct;

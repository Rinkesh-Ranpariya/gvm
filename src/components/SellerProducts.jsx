import { useEffect, useState } from "react";
import BaseTable from "./common/BaseTable";
import { Button } from "@mui/material";
import EditProduct from "./EditProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProductsByUser,
} from "../store/productsManagement/productsManagementSlice";

const SellerProducts = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [editProduct, setEditProduct] = useState({});

  const handleClose = () => {
    setOpen(false);
    dispatch(getProductsByUser());
    setEditProduct("");
  };

  const products = useSelector(
    (state) => state.productsManagement.userProducts
  );

  useEffect(() => {
    dispatch(getProductsByUser());
  }, []);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getProductsByUser());
  };

  const handleEditProduct = (item) => {
    handleOpen();
    setEditProduct({ ...item });
  };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Desc", field: "desc" },
    { title: "Price", field: "price" },
    {
      title: "Action",
      renderCell: (item) => (
        <>
          <Button
            variant="contained"
            onClick={() => handleDeleteProduct(item.productId)}
          >
            Delete
          </Button>
          <span className="ml-2">
            <Button variant="contained" onClick={() => handleEditProduct(item)}>
              Edit
            </Button>
          </span>
        </>
      ),
    },
  ];

  return (
    <div className="">
      <Button variant="contained" onClick={handleOpen}>
        Add product
      </Button>
      <BaseTable columns={columns} data={products} />

      {open && (
        <EditProduct handleClose={handleClose} editProductData={editProduct} />
      )}
    </div>
  );
};

export default SellerProducts;

import { useEffect, useState } from "react";
import BaseTable from "../common/BaseTable";
import { Button } from "@mui/material";
import EditProduct from "./EditProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProductsBySellerId,
} from "../../store/productsManagement/productsManagementSlice";

const SellerProducts = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState({});

  const products = useSelector(
    (state) => state.productsManagement.userProducts
  );

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    dispatch(getProductsBySellerId(userInfo.userId));
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(getProductsBySellerId(userInfo.userId));
    setEditProduct("");
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    dispatch(getProductsBySellerId(userInfo.userId));
  };

  const handleEditProduct = (item) => {
    handleOpen();
    setEditProduct({ ...item });
  };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Desc", field: "desc" },
    { title: "Price", field: "price" },
    { title: "Category", field: "category" },
    { title: "Brand", field: "brand" },
    { title: "Discount %", field: "discountPercentage" },
    { title: "Rating", field: "rating" },
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
          <span className="m-2">
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
      <div className="flex justify-end mb-7">
        <Button variant="contained" onClick={handleOpen}>
          Add product
        </Button>
      </div>

      <BaseTable columns={columns} data={products} />

      {open && (
        <EditProduct handleClose={handleClose} editProductData={editProduct} />
      )}
    </div>
  );
};

export default SellerProducts;

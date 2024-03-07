import BaseTable from "./common/BaseTable";
import { useSelector } from "react-redux";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Products = () => {
  const allProducts = useSelector(
    (state) => state.productsManagement.allProducts
  );

  const columns = [
    { title: "Name", field: "name" },
    { title: "Desc", field: "desc" },
    { title: "Price", field: "price" },
  ];

  return (
    <div>
      <div className="flex">
        {!!allProducts.length &&
          allProducts.map((prod) => (
            <Card sx={{ maxWidth: 345 }} className="mx-2">
              {/* <CardMedia
                sx={{ height: 140, width: 345 }}
                image={prod.img}
                title="green iguana"
              /> */}
              <div className="w-full">
                <img src={prod.img} width="100%" height="100%" />
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
                <Button size="small">Add to Cart</Button>
                <Button size="small">View</Button>
              </CardActions>
            </Card>
          ))}
        {!allProducts.length && <>No products</>}
      </div>

      {/* <BaseTable columns={columns} data={allProducts} /> */}
    </div>
  );
};

export default Products;

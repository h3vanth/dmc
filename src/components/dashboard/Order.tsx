import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../ducks";
import { ProductData } from "./Product";

const Order: React.FC<{ products: ProductData[]; placed: boolean }> = ({
  products,
  placed,
}) => {
  const {
    orders: { order, placedOrders },
  } = useSelector((state: RootState) => ({
    orders: state.orders,
  }));
  console.log(placedOrders);
  return (
    <Box sx={{ minWidth: 250 }}>
      {Object.entries<any>(placed ? placedOrders : order).map(
        ([productId, details]) => {
          const product = products.find(
            (product) => product.productId === productId
          );
          return (
            <Grid
              key={productId}
              container
              justifyContent="space-between"
              spacing={2}
            >
              <Grid item>
                <Typography variant="body1">{product?.productName}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  <b>{details?.quantity}</b> * {product?.price}
                </Typography>
              </Grid>
            </Grid>
          );
        }
      )}
    </Box>
  );
};

export default Order;

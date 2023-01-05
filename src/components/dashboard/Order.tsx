import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { ProductData } from "./Product";
import { useAppSelector } from "../../ducks";

const Order: React.FC<{ products: ProductData[]; placed: boolean }> = ({
  products,
  placed,
}) => {
  const {
    orders: { order, placedOrders },
  } = useAppSelector((state) => ({
    orders: state.orders,
  }));

  return (
    <Box sx={{ minWidth: 250 }}>
      {Object.entries<any>(placed ? placedOrders : order).map(
        // for placed orders
        // key => index, value => placed order obj
        // for orders
        // key => productId, value => details (order obj)
        ([key, value]) => {
          let product = null;
          if (!placed) {
            product = products.find((product) => product.productId === key);
          }
          return (
            <Grid
              key={key}
              container
              justifyContent="space-between"
              spacing={2}
            >
              <Grid item>
                <Typography variant="body1">
                  {placed ? value.productName : product?.productName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  <b>{value.quantity}</b> *{" "}
                  {placed ? value.price : product?.price}
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

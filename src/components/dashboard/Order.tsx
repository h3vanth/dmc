import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "../../ducks";
import { formatPrice } from "../../utils";

import { ProductData } from "../../types";

const Order: React.FC<{ products: ProductData[]; placed: boolean }> = ({
  products,
  placed,
}) => {
  const { order, placedOrders } = useAppSelector((state) => state.orders);

  const [entries, total] = React.useMemo(() => {
    let total = 0;
    let entries: {
      productName: string;
      quantity: number;
      price: number;
      productId: string;
    }[] = [];
    Object.entries<any>(placed ? placedOrders : order).forEach(
      // for placed orders
      // key => index, value => placed order obj
      // for orders
      // key => productId, value => details (order obj)
      ([key, value]) => {
        let product = null;
        if (!placed) {
          product = products.find((product) => product.productId === key);
        }
        entries.push({
          productName: placed ? value.productName : product?.productName,
          quantity: value.quantity,
          price: placed ? value.price : product?.price,
          productId: placed ? value.productId : key,
        });
        total += value.quantity * (placed ? value.price : product?.price);
      }
    );
    return [entries, total];
  }, [placed, placedOrders, order, products]);

  return (
    <Box sx={{ minWidth: 250 }}>
      {entries.map(({ productName, quantity, price, productId }) => (
        <Grid
          key={productId}
          container
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item>
            <Typography>{productName}</Typography>
          </Grid>
          <Grid item>
            <Typography>
              {formatPrice(price)} * <b>{quantity}</b>
            </Typography>
          </Grid>
        </Grid>
      ))}
      {placed && (
        <Typography variant="h5" sx={{ mt: 1 }} align="right">
          Total: {formatPrice(total)}
        </Typography>
      )}
    </Box>
  );
};

export default Order;

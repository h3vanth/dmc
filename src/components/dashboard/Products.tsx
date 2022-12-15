import * as React from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Product, { ProductData } from "./Product";
import Drawer from "../../base/Drawer";
import ProductDetails from "./ProductDetails";
import IconButton from "@mui/material/IconButton";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "../../base/Dialog";
import { useDispatch, useSelector } from "react-redux";

import Order from "./Order";
import { AppDispatch, RootState } from "../../ducks";
import { placeOrder } from "../../ducks/actions/orders";

const ITEMS_PER_PAGE = 12;

const Products: React.FC<{ products: ProductData[] }> = ({ products }) => {
  const [startIndex, setStartIndex] = React.useState(0);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openPlacedOrders, setOpenPlacedOrders] = React.useState(false);
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductData | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const {
    orders: { order, placedOrders },
  } = useSelector((state: RootState) => ({
    orders: state.orders,
  }));
  const shouldShowOrder = React.useMemo(() => {
    for (const key in order) {
      if (order[key].quantity !== 0) return true;
    }
    return false;
  }, [order]);

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        {products.length > ITEMS_PER_PAGE && (
          <Grid item>
            <Pagination
              count={Math.ceil(products.length / ITEMS_PER_PAGE)}
              onChange={(_, value) => {
                setStartIndex((value - 1) * ITEMS_PER_PAGE);
              }}
            />
          </Grid>
        )}
        <Grid item>
          {shouldShowOrder && (
            <Tooltip title="Review order">
              <IconButton
                onClick={() => {
                  setOpenPlacedOrders(false);
                  setOpenDialog(true);
                }}
              >
                <ShoppingCartCheckoutIcon />
              </IconButton>
            </Tooltip>
          )}
          {Object.keys(placedOrders).length !== 0 && (
            <Tooltip title="View placed orders">
              <IconButton
                onClick={() => {
                  setOpenPlacedOrders(true);
                  setOpenDialog(true);
                }}
              >
                <FastfoodIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {products
          .slice(startIndex, startIndex + ITEMS_PER_PAGE)
          .map((product) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={product.productId}>
                <Product
                  {...product}
                  setOpenDrawer={setOpenDrawer}
                  setSelectedProduct={setSelectedProduct}
                />
              </Grid>
            );
          })}
      </Grid>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <ProductDetails product={selectedProduct} />
      </Drawer>
      <Dialog
        open={openDialog}
        onClose={(e, clicked) => {
          setOpenDialog(false);
          if (clicked && !openPlacedOrders) {
            dispatch(placeOrder());
          }
        }}
        buttonLabel={openPlacedOrders ? "Pay" : "Place order"}
        title={openPlacedOrders ? "Placed orders" : "Review order"}
        fullScreen={false}
      >
        <Order products={products} placed={openPlacedOrders} />
      </Dialog>
    </>
  );
};

export default Products;

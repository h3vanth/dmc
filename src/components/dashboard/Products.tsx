import * as React from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Product, { ProductData } from "./Product";
import Drawer from "../../base/Drawer";
import ProductDetails from "./ProductDetails";
import IconButton from "@mui/material/IconButton";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "../../base/Dialog";

import Order from "./Order";
import { useAppDispatch, useAppSelector } from "../../ducks";
import { orderActions, orderActionTypes } from "../../ducks/actions/orders";
import TextField from "../../base/TextField";
import { commonActions, commonActionTypes } from "../../ducks/actions/common";
import { account } from "../../mocks/account";
import StompClient from "../../helpers/StompClient";

const ITEMS_PER_PAGE = 12;

enum ModalContent {
  ReviewOrder = "Review order",
  PlacedOrders = "Placed orders",
  ClearSession = "Clear session",
}

const Products: React.FC<{ products: ProductData[] }> = ({ products }) => {
  const [startIndex, setStartIndex] = React.useState(0);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<ModalContent>(
    ModalContent.ReviewOrder
  );
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductData | null>(null);
  const clearsessionpassRef = React.useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const {
    orders: { order, placedOrders },
  } = useAppSelector((state) => ({
    orders: state.orders,
  }));
  const shouldShowOrder = React.useMemo(() => {
    for (const key in order) {
      if (order[key].quantity !== 0) return true;
    }
    return false;
  }, [order]);

  const getDialogButtonLabel = () => {
    let buttonLabel;
    if (modalContent === ModalContent.ReviewOrder) {
      buttonLabel = "Place order";
    } else if (modalContent === ModalContent.PlacedOrders) {
      buttonLabel = "Pay";
    } else if (modalContent === ModalContent.ClearSession) {
      buttonLabel = "Clear";
    }
    return buttonLabel;
  };

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
                  setOpenDialog(true);
                  setModalContent(ModalContent.ReviewOrder);
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
                  setOpenDialog(true);
                  setModalContent(ModalContent.PlacedOrders);
                }}
              >
                <FastfoodIcon />
              </IconButton>
            </Tooltip>
          )}
          {/* TODO: Feature will be available in future */}
          {/* <Tooltip title="Clear session">
            <IconButton
              onClick={() => {
                setOpenDialog(true);
                setModalContent(ModalContent.ClearSession);
              }}
            >
              <ClearAllIcon />
            </IconButton>
          </Tooltip> */}
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
        <ProductDetails
          product={selectedProduct}
          setOpenDrawer={setOpenDrawer}
        />
      </Drawer>
      <Dialog
        open={openDialog}
        onClose={(_, clicked) => {
          setOpenDialog(false);
          if (clicked) {
            if (modalContent === ModalContent.ReviewOrder)
              dispatch(orderActions.placeOrder());
            else if (modalContent === ModalContent.ClearSession) {
              if (clearsessionpassRef.current?.value !== account.passcode) {
                return dispatch(
                  commonActions.showSnackbar({
                    message: "Invalid passcode. Couldn't clear session",
                    severity: "error",
                  })
                );
              }
              dispatch({
                type: orderActionTypes.EMPTY_ORDER,
              });
              dispatch({
                type: orderActionTypes.EMPTY_PLACED_ORDERS,
              });
              dispatch({
                type: commonActionTypes.SET_SESSION_ID,
                // For now, it's ok to use this
                payload: new Date().toISOString(),
              });
              dispatch(
                commonActions.showSnackbar({
                  message: "New session established!",
                  severity: "info",
                })
              );
            }
          }
        }}
        buttonLabel={getDialogButtonLabel()}
        title={modalContent}
        fullScreen={false}
      >
        {modalContent === ModalContent.ClearSession ? (
          <TextField
            placeholder="Enter password"
            name="clearsessionpass"
            inputProps={{
              ref: clearsessionpassRef,
            }}
          />
        ) : (
          <Order
            products={products}
            placed={modalContent === ModalContent.PlacedOrders}
          />
        )}
      </Dialog>
    </>
  );
};

export default Products;

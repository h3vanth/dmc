import { AppDispatch, GetStateType } from "..";
import { ProductAction } from "../../components/dashboard/Product";
import { METHOD } from "../../constants";
import StompClient from "../../helpers/StompClient";
import { f3tch } from "../../utils";
import { PlacedOrders } from "../reducers/orders";
import { commonActions } from "./common";

const orderActionTypes = {
  UPDATE_ORDER: "UPDATE_ORDER",
  PLACE_ORDER: "PLACE_ORDER",
  EMPTY_ORDER: "EMPTY_ORDER",
  EMPTY_PLACED_ORDERS: "EMPTY_PLACED_ORDERS",
};

const updateOrder = (payload: { action: ProductAction; productId: string }) => {
  return (dispatch: AppDispatch, getState: GetStateType) => {
    dispatch(commonActions.hideSnackbar());
    const order = JSON.parse(JSON.stringify(getState().orders.order));
    const { productId, action } = payload;
    let quantity = 0;

    if (order[productId]) {
      if (action === "add") {
        order[productId] = {
          quantity: order[productId].quantity + 1,
        };
      } else if (action === "remove") {
        quantity = order[productId].quantity - 1;
        if (quantity === 0) {
          delete order[productId];
        } else {
          order[productId] = {
            quantity,
          };
        }
      }
    } else {
      order[productId] = {
        quantity: 1,
      };
    }

    dispatch({
      type: orderActionTypes.UPDATE_ORDER,
      payload: order,
    });

    dispatch(
      commonActions.showSnackbar({
        message: `Product ${action === "add" ? "added" : "removed"} ${
          action === "add" ? "to" : "from"
        } cart`,
        severity: "success",
      })
    );
  };
};

const placeOrder = () => {
  return async (dispatch: AppDispatch, getState: GetStateType) => {
    dispatch(commonActions.toggleLoaderState());
    const state = getState();
    const products = state.products;
    const sessionId = state.common.sessionId;
    const { order, placedOrders } = state.orders;

    const orderedProducts = [];
    for (const key in order) {
      const placedOrder = (placedOrders as PlacedOrders)?.find(
        ({ productId }) => productId === key
      );
      const product = products.find(({ productId }) => productId === key);
      const prodObj: {
        [key: string]: string | number | undefined;
      } = {};
      if (placedOrder) {
        prodObj.orderId = placedOrder.orderId;
        prodObj.quantity = placedOrder.quantity + order[key].quantity;
      } else {
        prodObj.quantity = order[key].quantity;
      }
      prodObj.productId = key;
      prodObj.productName = product?.productName;
      prodObj.price = product?.price;
      prodObj.sessionId = sessionId;

      orderedProducts.push(prodObj);
    }

    const { okResponse, data } = await f3tch({
      url: import.meta.env.VITE_PLACE_ORDER,
      method: METHOD.POST,
      body: orderedProducts,
    });

    if (okResponse) {
      StompClient.send("/app/message");
      dispatch({
        type: orderActionTypes.EMPTY_ORDER,
      });
      dispatch(
        commonActions.showSnackbar({
          message: "Order placed",
          severity: "success",
        })
      );
      dispatch({
        type: orderActionTypes.PLACE_ORDER,
        payload: data,
      });
    } else {
      dispatch(
        commonActions.showSnackbar({
          message: "Oops! Couldn't place order. Please try again.",
          severity: "error",
        })
      );
    }
    dispatch(commonActions.toggleLoaderState());
  };
};

const orderActions = {
  updateOrder,
  placeOrder,
};

export { orderActionTypes, orderActions };

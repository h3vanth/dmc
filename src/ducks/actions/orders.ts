import { ThunkAction } from "..";
import { ALERT_SEVERITY, METHOD } from "../../constants";
import { SC } from "../../helpers";
import { PlacedOrders, ProductActionType } from "../../types";
import { f3tch } from "../../utils";
import { selectToken } from "../selectors";
import { commonActions } from "./common";

const orderActionTypes = {
  UPDATE_ORDER: "UPDATE_ORDER",
  PLACE_ORDER: "PLACE_ORDER",
  EMPTY_ORDER: "EMPTY_ORDER",
  EMPTY_PLACED_ORDERS: "EMPTY_PLACED_ORDERS",
};

const updateOrder =
  (payload: { action: ProductActionType; productId: string }): ThunkAction =>
  (dispatch, getState) => {
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
        severity: ALERT_SEVERITY.SUCCESS,
      })
    );
  };

const placeOrder = (): ThunkAction => async (dispatch, getState) => {
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
    url: import.meta.env.VITE_PLACE_ORDER_ENDPOINT,
    method: METHOD.POST,
    body: orderedProducts,
    token: selectToken(state),
  });

  if (okResponse) {
    SC.use({ token: state.auth.token }, (client) => {
      client.send("/app/message");
    });
    dispatch({
      type: orderActionTypes.EMPTY_ORDER,
    });
    dispatch(
      commonActions.showSnackbar({
        message: "Order placed",
        severity: ALERT_SEVERITY.SUCCESS,
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
        severity: ALERT_SEVERITY.ERROR,
      })
    );
  }
  dispatch(commonActions.toggleLoaderState());
};

const orderActions = {
  updateOrder,
  placeOrder,
};

export { orderActionTypes, orderActions };

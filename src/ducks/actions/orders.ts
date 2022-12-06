import { AppDispatch, GetStateType } from "..";
import { ProductAction } from "../../components/dashboard/Product";
import { commonActions } from "./common";

const orderActionTypes = {
  UPDATE_ORDER: "UPDATE_ORDER",
  PLACE_ORDER: "PLACE_ORDER",
};

const orderActions = {
  updateOrder: (payload: any) => ({
    type: orderActionTypes.UPDATE_ORDER,
    payload,
  }),
  placeOrder: (payload: any) => ({
    type: orderActionTypes.PLACE_ORDER,
    payload,
  }),
};

// Action creators
const updateOrder = (payload: { action: ProductAction; productId: string }) => {
  return (dispatch: AppDispatch, getState: GetStateType) => {
    dispatch(commonActions.hideSnackbar());
    const order = getState().orders.order;
    const { productId, action } = payload;
    dispatch(
      orderActions.updateOrder({
        [productId]: {
          quantity: order[productId]
            ? action === "add"
              ? order[productId].quantity + 1
              : order[productId].quantity - 1
            : 1,
        },
      })
    );
    // TODO: To change message and severity based on API response
    dispatch(
      commonActions.showSnackbar({
        message: `Product ${action === "add" ? "added" : "removed"}`,
        severity: "success",
      })
    );
  };
};

const placeOrder = () => {
  return (dispatch: AppDispatch, getState: GetStateType) => {
    const { order, placedOrders } = getState().orders;
    const placedOrdersCopy = { ...placedOrders };

    for (const key in order) {
      if (placedOrdersCopy[key]) {
        placedOrdersCopy[key].quantity += order[key].quantity;
      } else {
        placedOrdersCopy[key] = { ...order[key] };
      }
    }

    dispatch(
      orderActions.placeOrder({
        ...placedOrdersCopy,
      })
    );
  };
};

export { orderActionTypes, orderActions };
export { updateOrder, placeOrder };

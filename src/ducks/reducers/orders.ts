import { orderActionTypes } from "../actions/orders";
import { Order, PlacedOrders } from "../../types";

const initialState: {
  order: Order;
  placedOrders: PlacedOrders;
} = {
  order: {},
  placedOrders: [],
};

const reducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case orderActionTypes.UPDATE_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case orderActionTypes.EMPTY_ORDER:
      return {
        ...state,
        order: {},
      };
    case orderActionTypes.PLACE_ORDER:
      return {
        ...state,
        order: {},
        placedOrders: action.payload,
      };
    case orderActionTypes.EMPTY_PLACED_ORDERS:
      return {
        ...state,
        placedOrders: [],
      };
    default:
      return state;
  }
};

export { initialState, reducer as default };

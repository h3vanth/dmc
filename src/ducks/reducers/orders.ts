import { orderActionTypes } from "../actions/orders";

type Order = {
  [productId: string]: {
    quantity: number;
  };
};

export const initialState: {
  order: Order;
  placedOrders: Order;
} = {
  order: {},
  placedOrders: {},
};

const reducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case orderActionTypes.UPDATE_ORDER:
      return {
        ...state,
        order: { ...state.order, ...action.payload },
      };
    case orderActionTypes.PLACE_ORDER:
      return {
        ...state,
        order: {},
        placedOrders: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

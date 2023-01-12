import { ProductData } from "../../types";
import { productActionTypes } from "../actions/products";

const initialState: ProductData[] = [];

const reducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case productActionTypes.SET_PRODUCTS:
      return action.payload as ProductData[];
    default:
      return state;
  }
};

export { initialState, reducer as default };

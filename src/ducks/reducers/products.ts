import { ProductData } from "../../components/dashboard/Product";
import { productActionTypes } from "../actions/products";

export const initialState: ProductData[] = [];

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

export default reducer;

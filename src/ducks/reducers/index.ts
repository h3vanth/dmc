import { combineReducers } from "redux";

import common, { initialState as initState_common } from "./common";
import orders, { initialState as initState_orders } from "./orders";
import auth, { initialState as initState_auth } from "./auth";
import products, { initialState as initialState_products } from "./products";
import categories, {
  initialState as initialState_categories,
} from "./categories";
import { authActionTypes } from "../actions/auth";

const INITIAL_STATE = {
  common: initState_common,
  orders: initState_orders,
  auth: initState_auth,
  products: initialState_products,
  categories: initialState_categories,
};

const appReducer = combineReducers({
  common,
  orders,
  auth,
  products,
  categories,
});

const rootReducer = (state: any, action: any) => {
  if (action?.type === authActionTypes.DESTROY_STORE) {
    state = INITIAL_STATE;
  }
  return appReducer(state, action);
};

export { INITIAL_STATE, rootReducer as default };

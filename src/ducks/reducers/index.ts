import { combineReducers } from "redux";

import common, { initialState as initState_common } from "./common";
import orders, { initialState as initState_orders } from "./orders";

const INITIAL_STATE = {
  common: initState_common,
  orders: initState_orders,
};

const rootReducer = combineReducers({
  common,
  orders,
});

export { INITIAL_STATE };
export default rootReducer;

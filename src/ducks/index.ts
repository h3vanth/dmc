import { createStore, applyMiddleware, AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

import rootReducer, { INITIAL_STATE } from "./reducers";

const data = localStorage.getItem("dmc");

const store = createStore(
  rootReducer,
  data ? JSON.parse(data) : INITIAL_STATE,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  localStorage.setItem("dmc", JSON.stringify(store.getState()));
});

export type GetStateType = typeof store.getState;
export type RootState = ReturnType<typeof store.getState>;

type AppAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<RootState, any, AppAction>;

export default store;

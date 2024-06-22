import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

import rootReducer, { INITIAL_STATE } from "./reducers";

const data = sessionStorage.getItem("dmc");
sessionStorage.removeItem("dmc");

const store = createStore(
  rootReducer,
  data ? JSON.parse(data) : INITIAL_STATE,
  applyMiddleware(thunk)
);

window.onbeforeunload = function () {
  const state = structuredClone(store.getState());
  if (state.auth.isAuth) {
    state.common.online = false;
    // TODO: can be encrypted and stored
    // TODO: make key env specific
    sessionStorage.setItem("dmc", JSON.stringify(state));
  }
};

type RootState = ReturnType<typeof store.getState>;
type AppAction = ReturnType<typeof store.dispatch>;
type AppDispatch = ThunkDispatch<RootState, unknown, AppAction>;
type ThunkAction = (
  dispatch: ThunkDispatch<RootState, unknown, AppAction>,
  getState: () => RootState,
  extraArgument: unknown
) => void;

// Typed useSelector, useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch: () => AppDispatch = useDispatch;

export {
  useAppSelector,
  useAppDispatch,
  store as default,
  type AppDispatch,
  type ThunkAction,
};

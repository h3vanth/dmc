import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware, AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

import rootReducer, { INITIAL_STATE } from "./reducers";

const data = localStorage.getItem("dmc");

const store = createStore(
  rootReducer,
  data ? JSON.parse(data) : INITIAL_STATE,
  applyMiddleware(thunk)
);

if (!import.meta.env.vitest) {
  store.subscribe(() => {
    localStorage.setItem("dmc", JSON.stringify(store.getState()));
  });
}

type GetStateType = typeof store.getState;
type RootState = ReturnType<typeof store.getState>;
type AppAction = ReturnType<typeof store.dispatch>;

type AppDispatch = ThunkDispatch<RootState, any, AppAction>;

// Typed useSelector, useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch: () => AppDispatch = useDispatch;

export {
  useAppSelector,
  useAppDispatch,
  store as default,
  type GetStateType,
  type AppDispatch,
};

import { authActionTypes } from "../actions/auth";

export const initialState = {
  isAuth: false,
  token: "",
};

const reducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case authActionTypes.SET_AUTH_DATA:
      return { ...state, isAuth: true, token: action.payload?.token };
    case authActionTypes.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;

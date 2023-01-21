import { authActionTypes } from "../actions/auth";

const initialState = {
  isAuth: false,
  token: "",
  email: "",
  passcode: "",
};

const reducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case authActionTypes.SET_AUTH_TOKEN:
      return {
        isAuth: true,
        ...action.payload,
      };
    case authActionTypes.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export { initialState, reducer as default };

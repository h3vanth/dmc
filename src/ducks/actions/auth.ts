import { AppDispatch } from "..";

const authActionTypes = {
  SET_AUTH_DATA: "SET_AUTH_DATA",
  LOGOUT: "LOGOUT",
  DESTROY_STORE: "DESTROY_STORE",
};

const logoutUser = () => {
  return (dispatch: AppDispatch) => {
    dispatch(authActions.destroyStore());
    localStorage.removeItem("dmc");
  };
};

const authActions = {
  setAuthData: (payload: { token: string }) => ({
    type: authActionTypes.SET_AUTH_DATA,
    payload,
  }),
  destroyStore: () => ({
    type: authActionTypes.DESTROY_STORE,
  }),
};

export { logoutUser };
export { authActionTypes, authActions };

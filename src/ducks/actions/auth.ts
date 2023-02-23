import { ThunkAction } from "..";
import { METHOD, ERRORS, ALERT_SEVERITY } from "../../constants";
import { f3tch, joinStringArray } from "../../utils";
import { commonActions } from "./common";
import { productActions } from "./products";

const authActionTypes = {
  SET_AUTH_TOKEN: "SET_AUTH_TOKEN",
  LOGOUT: "LOGOUT",
  DESTROY_STORE: "DESTROY_STORE",
};

const register =
  (
    payload: { email: string; password: string },
    successCb: () => void
  ): ThunkAction =>
  async (dispatch) => {
    dispatch(commonActions.toggleLoaderState());
    const { okResponse, data } = await f3tch({
      url: import.meta.env.VITE_REGISTER_ENDPOINT,
      method: METHOD.POST,
      body: payload,
    });
    dispatch(commonActions.toggleLoaderState());

    if (okResponse) {
      dispatch(authenticate(payload, successCb));
    } else {
      dispatch(
        commonActions.showSnackbar({
          message: data?.errorMessages
            ? joinStringArray(data.errorMessages)
            : ERRORS.COMMON,
          severity: ALERT_SEVERITY.ERROR,
        })
      );
    }
  };

const authenticate =
  (
    { email, password }: { email: string; password: string },
    successCb: () => void
  ): ThunkAction =>
  async (dispatch) => {
    dispatch(commonActions.toggleLoaderState());
    const { headers, okResponse, data } = await f3tch({
      url: import.meta.env.VITE_AUTH_ENDPOINT,
      method: METHOD.POST,
      headers: {
        Authorization: `Basic ${btoa(`${email}:${password}`)}`,
      },
    });
    dispatch(commonActions.toggleLoaderState());
    if (okResponse) {
      const token = headers?.get("authorization")?.split(" ")?.[1];
      if (token) {
        dispatch(
          authActions.setAuthToken({
            token,
            email: data?.email,
            passcode: data?.passcode,
          })
        );
        successCb();
        dispatch(productActions.fetchProducts());
      } else {
        dispatch(
          commonActions.showSnackbar({
            message: ERRORS.COMMON,
            severity: ALERT_SEVERITY.ERROR,
          })
        );
      }
    } else {
      dispatch(
        commonActions.showSnackbar({
          message: data?.errorMessages
            ? joinStringArray(data.errorMessages)
            : ERRORS.COMMON,
          severity: ALERT_SEVERITY.ERROR,
        })
      );
    }
  };

const authActions = {
  setAuthToken: (payload: {
    token: string;
    email: string;
    passcode: string;
  }) => ({
    type: authActionTypes.SET_AUTH_TOKEN,
    payload,
  }),
  destroyStore: () => ({
    type: authActionTypes.DESTROY_STORE,
  }),
  register,
  authenticate,
};

export { authActionTypes, authActions };

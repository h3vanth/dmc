import { AppDispatch, GetStateType } from "..";
import { ALERT_SEVERITY, METHOD } from "../../constants";
import { ERRORS } from "../../constants";
import { SC } from "../../helpers";
import { Obj, ProductData } from "../../types";
import { f3tch, joinStringArray } from "../../utils";
import { selectToken } from "../selectors";
import { commonActions } from "./common";
import { orderActionTypes } from "./orders";

export type SuccessCallback = undefined | (() => void);

const productActionTypes = {
  SET_PRODUCTS: "SET_PRODUCTS",
};

const fetchProducts = () => {
  return async (dispatch: AppDispatch, getState: GetStateType) => {
    dispatch(commonActions.toggleLoaderState());
    const { data, okResponse } = await f3tch({
      url: import.meta.env.VITE_PRODUCTS_ENDPOINT,
      method: METHOD.GET,
      token: selectToken(getState()),
    });
    dispatch(commonActions.toggleLoaderState());
    if (okResponse) {
      dispatch({
        type: productActionTypes.SET_PRODUCTS,
        payload: data,
      });
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
};

const setProducts = (products: ProductData[]) => {
  return (dispatch: AppDispatch, getState: GetStateType) => {
    dispatch({
      type: productActionTypes.SET_PRODUCTS,
      payload: products,
    });
    const order = JSON.parse(JSON.stringify(getState().orders.order));
    const orderProductIds = Object.keys(order);
    const orderedProducts = products.filter(({ productId }) =>
      orderProductIds.includes(productId)
    );
    let showSnackbar = false;
    orderedProducts.forEach(({ isAvailable, productId, availableQuantity }) => {
      if (!isAvailable) {
        delete order[productId];
        showSnackbar = true;
      } else if (availableQuantity < order[productId]?.quantity) {
        order[productId] = {
          quantity: availableQuantity,
        };
        showSnackbar = true;
      }
    });
    dispatch({
      type: orderActionTypes.UPDATE_ORDER,
      payload: order,
    });
    if (showSnackbar)
      dispatch(
        commonActions.showSnackbar({
          message:
            "Some items became unavailable. We adjusted your cart accordingly.",
          severity: ALERT_SEVERITY.INFO,
        })
      );
  };
};

const addProduct = (
  formData: FormData,
  successCb?: undefined | (() => void)
) => {
  return async (dispatch: AppDispatch, getState: GetStateType) => {
    dispatch(commonActions.toggleLoaderState());
    const state = getState();
    const { data, okResponse } = await f3tch({
      url: import.meta.env.VITE_PRODUCTS_ENDPOINT,
      method: METHOD.POST,
      body: formData,
      token: selectToken(state),
    });
    dispatch(commonActions.toggleLoaderState());
    if (okResponse) {
      SC.use({ token: state.auth.token }, (client) => {
        client.send("/app/message");
      });
      dispatch(
        commonActions.showSnackbar({
          message: "Product added",
          severity: ALERT_SEVERITY.SUCCESS,
        })
      );
      if (successCb) successCb();
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
};

const updateProduct = (product: Obj, successCb?: SuccessCallback) => {
  return async (dispatch: AppDispatch, getState: GetStateType) => {
    dispatch(commonActions.toggleLoaderState());
    const state = getState();
    const { data, okResponse } = await f3tch({
      url: import.meta.env.VITE_PRODUCTS_ENDPOINT,
      method: METHOD.PUT,
      body: product,
      token: selectToken(state),
    });
    dispatch(commonActions.toggleLoaderState());
    if (okResponse) {
      SC.use({ token: state.auth.token }, (client) => {
        client.send("/app/message");
      });
      dispatch(
        commonActions.showSnackbar({
          message: "Product updated",
          severity: ALERT_SEVERITY.SUCCESS,
        })
      );
      if (successCb) successCb();
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
};

const deleteProducts = (productIds: string, successCb?: SuccessCallback) => {
  return async (dispatch: AppDispatch, getState: GetStateType) => {
    dispatch(commonActions.toggleLoaderState());
    const state = getState();
    const { data, okResponse } = await f3tch({
      url: import.meta.env.VITE_PRODUCTS_ENDPOINT + `/${productIds}`,
      method: METHOD.DELETE,
      token: selectToken(state),
    });
    dispatch(commonActions.toggleLoaderState());
    if (okResponse) {
      SC.use({ token: state.auth.token }, (client) => {
        client.send("/app/message");
      });
      dispatch(
        commonActions.showSnackbar({
          message: "Product(s) deleted",
          severity: ALERT_SEVERITY.SUCCESS,
        })
      );
      if (successCb) successCb();
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
};

const productActions = {
  fetchProducts,
  setProducts,
  addProduct,
  updateProduct,
  deleteProducts,
};

export { productActionTypes, productActions };

import { AppDispatch, GetStateType } from "..";
import { ProductData } from "../../components/dashboard/Product";
import { Inputs as AddProductInputs } from "../../components/manage/AddProduct";
import { Inputs as EditProductInputs } from "../../components/manage/EditProduct";
import { METHOD } from "../../constants";
import { ERRORS } from "../../constants/errors";
import StompClient from "../../helpers/StompClient";
import { f3tch, joinStringArray } from "../../utils";
import { commonActions } from "./common";
import { orderActionTypes } from "./orders";

export type SuccessCallback = undefined | (() => void);

const productActionTypes = {
  SET_PRODUCTS: "SET_PRODUCTS",
};

const fetchProducts = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(commonActions.toggleLoaderState());
    const { data, okResponse } = await f3tch({
      url: import.meta.env.VITE_PRODUCTS_ENDPOINT,
      method: METHOD.GET,
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
          severity: "error",
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
          severity: "info",
        })
      );
  };
};

const addProduct = (
  product: AddProductInputs,
  successCb?: undefined | (() => void)
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(commonActions.toggleLoaderState());
    const { data, okResponse } = await f3tch({
      url: import.meta.env.VITE_PRODUCTS_ENDPOINT,
      method: METHOD.POST,
      body: product,
    });
    dispatch(commonActions.toggleLoaderState());
    if (okResponse) {
      StompClient.send("/app/message");
      dispatch(
        commonActions.showSnackbar({
          message: "Product added",
          severity: "success",
        })
      );
      if (successCb) successCb();
    } else {
      dispatch(
        commonActions.showSnackbar({
          message: data?.errorMessages
            ? joinStringArray(data.errorMessages)
            : ERRORS.COMMON,
          severity: "error",
        })
      );
    }
  };
};

const updateProduct = (
  product: EditProductInputs,
  successCb?: SuccessCallback
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(commonActions.toggleLoaderState());
    const { data, okResponse } = await f3tch({
      url: import.meta.env.VITE_PRODUCTS_ENDPOINT,
      method: METHOD.PUT,
      body: product,
    });
    dispatch(commonActions.toggleLoaderState());
    if (okResponse) {
      StompClient.send("/app/message");
      dispatch(
        commonActions.showSnackbar({
          message: "Product updated",
          severity: "success",
        })
      );
      if (successCb) successCb();
    } else {
      dispatch(
        commonActions.showSnackbar({
          message: data?.errorMessages
            ? joinStringArray(data.errorMessages)
            : ERRORS.COMMON,
          severity: "error",
        })
      );
    }
  };
};

const deleteProducts = (productIds: string, successCb?: SuccessCallback) => {
  return async (dispatch: AppDispatch) => {
    dispatch(commonActions.toggleLoaderState());
    const { data, okResponse } = await f3tch({
      url: import.meta.env.VITE_PRODUCTS_ENDPOINT + `/${productIds}`,
      method: METHOD.DELETE,
    });
    dispatch(commonActions.toggleLoaderState());
    if (okResponse) {
      StompClient.send("/app/message");
      dispatch(
        commonActions.showSnackbar({
          message: "Product(s) deleted",
          severity: "success",
        })
      );
      if (successCb) successCb();
    } else {
      dispatch(
        commonActions.showSnackbar({
          message: data?.errorMessages
            ? joinStringArray(data.errorMessages)
            : ERRORS.COMMON,
          severity: "error",
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

import { ThunkAction } from "..";
import { ALERT_SEVERITY, METHOD } from "../../constants";
import { ERRORS } from "../../constants";
import { Obj, ProductData, ProductCategoryCreatedEvent } from "../../types";
import { f3tch, joinStringArray } from "../../utils";
import { selectToken } from "../selectors";
import { categoriesActions } from "./categories";
import { commonActions } from "./common";
import { orderActionTypes } from "./orders";

export type SuccessCallback = undefined | (() => void);

const productActionTypes = {
  SET_PRODUCTS: "SET_PRODUCTS",
};

const fetchProducts = (): ThunkAction => async (dispatch, getState) => {
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

const setProducts =
  (products: ProductData[]): ThunkAction =>
  (dispatch, getState) => {
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

const addProduct =
  (formData: FormData, successCb?: undefined | (() => void)): ThunkAction =>
  async (dispatch, getState) => {
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

const updateProduct =
  (product: Obj, successCb?: SuccessCallback): ThunkAction =>
  async (dispatch, getState) => {
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

const deleteProducts =
  (productIds: string, successCb?: SuccessCallback): ThunkAction =>
  async (dispatch, getState) => {
    dispatch(commonActions.toggleLoaderState());
    const state = getState();
    const { data, okResponse } = await f3tch({
      url: import.meta.env.VITE_PRODUCTS_ENDPOINT + `/${productIds}`,
      method: METHOD.DELETE,
      token: selectToken(state),
    });
    dispatch(commonActions.toggleLoaderState());
    if (okResponse) {
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

const deleteEventFields = (event: any) => {
  delete event.timestamp;
  delete event.type;
};

const adjustProducts =
  (event: any): ThunkAction =>
  async (dispatch, getState) => {
    const eventType = event.type;
    const { products } = getState();
    switch (eventType) {
      case "ProductCreated":
        deleteEventFields(event);
        const product = event as ProductData;
        dispatch(productActions.setProducts([...products, product]));
        break;
      case "ProductUpdated":
      case "ProductCategoryRemoved": // TODO Not supported currently
        deleteEventFields(event);
        const updatedProduct = event;
        const productId = updatedProduct.productId;
        dispatch(
          productActions.setProducts(
            products.map((product) => {
              if (product.productId === productId) {
                delete updatedProduct.productBeforeUpdate;
                delete updatedProduct.category;
                return updatedProduct;
              }
              return product;
            })
          )
        );
        break;
      case "ProductDeleted":
        const deleted = (event as ProductData).productId;
        dispatch(
          productActions.setProducts(
            products.filter((product) => {
              if (product.productId !== deleted) {
                return true;
              }
              return false;
            })
          )
        );
        break;
      case "ProductCategoryCreated":
        dispatch(
          categoriesActions.setCategories(
            (event as ProductCategoryCreatedEvent).categories
          )
        );
        break;
      // TODO
      case "OrderPlaced":
        dispatch({ type: orderActionTypes.EMPTY_ORDER });
        break;
      default:
        throw new Error("Invalid event type");
    }
  };

const productActions = {
  fetchProducts,
  setProducts,
  addProduct,
  updateProduct,
  deleteProducts,
  adjustProducts,
};

export { productActionTypes, productActions };

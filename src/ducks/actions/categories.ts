import { ThunkAction } from "..";
import { ALERT_SEVERITY, ERRORS, METHOD } from "../../constants";
import { f3tch, joinStringArray } from "../../utils";
import { selectToken } from "../selectors";
import { commonActions } from "./common";

const categoriesActionTypes = {
  GET_CATEGORIES: "GET_CATEGORIES",
  SET_CATEGORIES: "SET_CATEGORIES",
};

const getCategories = (): ThunkAction => async (dispatch, getState) => {
  dispatch(commonActions.toggleLoaderState());
  const { data, okResponse } = await f3tch({
    url: import.meta.env.VITE_CATEGORIES_ENDPOINT,
    method: METHOD.GET,
    token: selectToken(getState()),
  });
  dispatch(commonActions.toggleLoaderState());
  if (okResponse) {
    dispatch({
      type: categoriesActionTypes.SET_CATEGORIES,
      payload: data ?? [],
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

const addCategory =
  (category: string): ThunkAction =>
  async (dispatch, getState) => {
    const categories = getState().categories;
    const newCategories = [...categories, category];
    dispatch(commonActions.toggleLoaderState());
    const { data, okResponse } = await f3tch({
      url: import.meta.env.VITE_CATEGORIES_ENDPOINT,
      method: METHOD.PUT,
      token: selectToken(getState()),
      body: newCategories,
    });
    dispatch(commonActions.toggleLoaderState());
    if (!okResponse) {
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

const removeCategory =
  (productId: string, category: string): ThunkAction =>
  async (dispatch, getState) => {
    dispatch(commonActions.toggleLoaderState());
    const { data, okResponse } = await f3tch({
      url: `${
        import.meta.env.VITE_PRODUCTS_ENDPOINT
      }/${productId}/categories/${category}`,
      method: METHOD.DELETE,
      token: selectToken(getState()),
    });
    dispatch(commonActions.toggleLoaderState());
    if (!okResponse) {
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

const categoriesActions = {
  setCategories: (payload: string[]) => ({
    type: categoriesActionTypes.SET_CATEGORIES,
    payload,
  }),
  getCategories,
  addCategory,
  removeCategory,
};

export { categoriesActionTypes, categoriesActions };

import { AppDispatch } from "..";
import { ProductData } from "../../components/dashboard/Product";
import { commonActions } from "./common";

const productActionTypes = {
  SET_PRODUCTS: "SET_PRODUCTS",
};

const fetchProducts = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(commonActions.toggleLoaderState());
    const response = await fetch("http://localhost:8080/api/v1/products");
    const products = await response.json();
    dispatch(productActions.setProducts(products));
    dispatch(commonActions.toggleLoaderState());
  };
};

const productActions = {
  setProducts: (payload: ProductData[]) => ({
    type: productActionTypes.SET_PRODUCTS,
    payload,
  }),
};

export { productActionTypes, productActions, fetchProducts };

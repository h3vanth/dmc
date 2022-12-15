import { SnackbarData } from "../../components/layout/Snackbar";

const commonActionTypes = {
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  HIDE_SNACKBAR: "HIDE_SNACKBAR",
  TOGGLE_LOADER_STATE: "TOGGLE_LOADER_STATE",
  RESTRICT_ROUTES: "RESTRICT_ROUTES",
};

const commonActions = {
  showSnackbar: (payload: SnackbarData) => ({
    type: commonActionTypes.SHOW_SNACKBAR,
    payload,
  }),
  hideSnackbar: () => ({
    type: commonActionTypes.HIDE_SNACKBAR,
  }),
  toggleLoaderState: () => ({
    type: commonActionTypes.TOGGLE_LOADER_STATE,
  }),
  restrictRoutes: (...payload: string[]) => ({
    type: commonActionTypes.RESTRICT_ROUTES,
    payload,
  }),
};

export { commonActionTypes, commonActions };

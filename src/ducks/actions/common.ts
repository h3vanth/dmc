import { SnackbarData } from "../../types";

const commonActionTypes = {
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  HIDE_SNACKBAR: "HIDE_SNACKBAR",
  TOGGLE_LOADER_STATE: "TOGGLE_LOADER_STATE",
  RESTRICT_ROUTES: "RESTRICT_ROUTES",
  TOGGLE_ONLINE_STATUS: "TOGGLE_ONLINE_STATUS",
  SET_SESSION_ID: "SET_SESSION_ID",
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
  toggleOnlineStatus: () => ({
    type: commonActionTypes.TOGGLE_ONLINE_STATUS,
  }),
};

export { commonActionTypes, commonActions };

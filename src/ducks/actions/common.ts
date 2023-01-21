import { SnackbarData } from "../../types";

const commonActionTypes = {
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  HIDE_SNACKBAR: "HIDE_SNACKBAR",
  TOGGLE_LOADER_STATE: "TOGGLE_LOADER_STATE",
  TOGGLE_ONLINE_STATUS: "TOGGLE_ONLINE_STATUS",
  SET_SESSION_ID: "SET_SESSION_ID",
  TOGGLE_NAV_CONTROL: "TOGGLE_NAV_CONTROL",
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
  toggleOnlineStatus: () => ({
    type: commonActionTypes.TOGGLE_ONLINE_STATUS,
  }),
  toggleNavControl: () => ({
    type: commonActionTypes.TOGGLE_NAV_CONTROL,
  }),
};

export { commonActionTypes, commonActions };

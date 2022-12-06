import { SnackbarData } from "../../components/layout/Snackbar";

const commonActionTypes = {
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  HIDE_SNACKBAR: "HIDE_SNACKBAR",
};

const commonActions = {
  showSnackbar: (payload: SnackbarData) => ({
    type: commonActionTypes.SHOW_SNACKBAR,
    payload,
  }),
  hideSnackbar: () => ({
    type: commonActionTypes.HIDE_SNACKBAR,
  }),
};

export { commonActionTypes, commonActions };

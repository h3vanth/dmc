import { commonActionTypes } from "../actions/common";

export const initialState = {
  isLoading: false,
  snackbar: { message: "", severity: "success", open: false },
};

const reducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case commonActionTypes.SHOW_SNACKBAR:
      return { ...state, snackbar: { ...action.payload, open: true } };
    case commonActionTypes.HIDE_SNACKBAR:
      return { ...state, snackbar: { ...initialState.snackbar } };
    default:
      return state;
  }
};

export default reducer;

import { ALERT_SEVERITY } from "../../constants";
import { commonActionTypes } from "../actions/common";

const initialState = {
  isLoading: false,
  snackbar: { message: "", severity: ALERT_SEVERITY.SUCCESS, open: false },
  isOnline: false,
  sessionId: new Date().toISOString(),
  allowNavigation: true,
};

const reducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case commonActionTypes.SHOW_SNACKBAR:
      return { ...state, snackbar: { ...action.payload, open: true } };
    case commonActionTypes.HIDE_SNACKBAR:
      return { ...state, snackbar: { ...state.snackbar, open: false } };
    case commonActionTypes.TOGGLE_LOADER_STATE:
      return { ...state, isLoading: !state.isLoading };
    case commonActionTypes.TOGGLE_ONLINE_STATUS:
      return { ...state, isOnline: !state.isOnline };
    case commonActionTypes.SET_SESSION_ID:
      return { ...state, sessionId: action.payload };
    case commonActionTypes.TOGGLE_NAV_CONTROL:
      return { ...state, allowNavigation: !state.allowNavigation };
    default:
      return state;
  }
};

export { initialState, reducer as default };

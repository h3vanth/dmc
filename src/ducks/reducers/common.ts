import { commonActionTypes } from "../actions/common";

export const initialState = {
  isLoading: false,
  snackbar: { message: "", severity: "success", open: false },
  restrictedRoutes: [] as string[],
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
    case commonActionTypes.TOGGLE_LOADER_STATE:
      return { ...state, isLoading: !state.isLoading };
    case commonActionTypes.RESTRICT_ROUTES:
      let restrictedRoutes: string[] = [];
      if (state.restrictedRoutes) {
        action.payload.forEach((path: string) => {
          if (!state.restrictedRoutes.includes(path))
            restrictedRoutes.push(path);
        });
        restrictedRoutes = [...state.restrictedRoutes, ...restrictedRoutes];
      } else {
        restrictedRoutes = action.payload;
      }
      return {
        ...state,
        restrictedRoutes,
      };
    default:
      return state;
  }
};

export default reducer;

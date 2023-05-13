import { categoriesActionTypes } from "../actions/categories";

const initialState: string[] = [];

const reducer = (
  state = initialState,
  action: { type: string; payload: string[] }
) => {
  switch (action.type) {
    case categoriesActionTypes.SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export { initialState, reducer as default };

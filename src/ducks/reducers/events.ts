import { Event } from "../../types";
import { eventActionTypes } from "../actions/events";

const initialState: Event[] = [];

const reducer = (
  state = initialState,
  action: { type: string; payload: Event }
) => {
  switch (action.type) {
    case eventActionTypes.ADD_EVENT:
      return [action.payload, ...state];
    default:
      return state;
  }
};

export { initialState, reducer as default };

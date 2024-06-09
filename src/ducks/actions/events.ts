import { Event } from "../../types";

const eventActionTypes = {
  ADD_EVENT: "ADD_EVENT",
};

const eventActions = {
  addEvent: (payload: Event) => ({
    type: eventActionTypes.ADD_EVENT,
    payload,
  }),
};

export { eventActionTypes, eventActions };

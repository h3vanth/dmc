import { authActionTypes } from '../actions/auth';

const initialState = {
  isAuth: false,
  token: '',
  email: '',
  passcode: '',
  userId: '',
  currentSessions: 0,
};

const reducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case authActionTypes.SET_AUTH_TOKEN:
      return {
        isAuth: true,
        ...action.payload,
      };
    case authActionTypes.UPDATE_SESSION_COUNT:
      return { ...state, currentSessions: action.payload };
    case authActionTypes.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export { initialState, reducer as default };

import { AuthActionTypes } from "../constants/AuthConstants";

const initialState = {
  user: null,
  email : null,
  token : null
};

export const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: payload.user,
        email: payload.email ?? null,
        token: payload.token
      };
    case AuthActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

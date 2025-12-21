import { AuthActionTypes } from "../constants/AuthConstants";

export const setUser = ({user,email,token}) => {
  return {
    type: AuthActionTypes.SET_USER,
    payload: { user, email, token },
  };
};

export const logout = () => {
  return {
    type: AuthActionTypes.LOGOUT,
  };
};

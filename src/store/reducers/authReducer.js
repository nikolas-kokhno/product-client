import {
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../types/auth.types";

const initialState = {
  loading: false,
  errors: null,
  loggetIn: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_START:
      return { ...state, loading: true, errors: false };
    case LOGIN_ERROR:
      return { ...state, loading: false, errors: payload };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, loggetIn: true };

    case LOGOUT_SUCCESS:
      return { ...state, loading: false, loggetIn: false };

    default:
      return state;
  }
};

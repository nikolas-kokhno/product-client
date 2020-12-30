import axios from "axios";
import { InfoMessage } from "../../components/infoMessage";
import {
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../types/auth.types";

// TODO: Move to config file
const baseURL = "https://us-central1-cleveroad-8232d.cloudfunctions.net/api";

export const login = (data) => async (dispatch) => {
  dispatch({ type: LOGIN_START });

  let loginData = {
    email: data.email,
    password: data.password,
  };

  await axios
    .post(`${baseURL}/login`, loginData)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      localStorage.setItem("token", res.data.token);
      InfoMessage("success", "You have successfully logged in!");
    })
    .catch((err) => {
      dispatch({ type: LOGIN_ERROR, payload: err.message });
      InfoMessage("error", err.message);
    });
};

export const saveJWT = (token) => (dispatch) => {
  dispatch({ type: LOGIN_SUCCESS, payload: token });
};

export const logout = () => (dispatch) => {
  if (localStorage.getItem("token")) {
    localStorage.clear();
    dispatch({ type: LOGOUT_SUCCESS });
  }
};

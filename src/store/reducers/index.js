import { combineReducers } from "redux";

import productReducer from "./productReducer";
import authReducet from "./authReducer";

export default combineReducers({
  products: productReducer,
  auth: authReducet,
});

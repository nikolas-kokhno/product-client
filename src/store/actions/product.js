import axios from "axios";
import { InfoMessage } from "../../components/infoMessage";
import {
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_ERROR,
  PRODUCT_START,
  PRODUCT_EDIT_SUCCESS,
} from "../types/product.types";

// TODO: Move to config file
const baseURL = "https://us-central1-cleveroad-8232d.cloudfunctions.net/api";

export const getProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_START });

  await axios
    .get(`${baseURL}/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_ERROR, payload: err.message });
    });
};

export const createProduct = (data) => async (dispatch) => {
  dispatch({ type: PRODUCT_START });

  const productData = new FormData();
  productData.append("imageURL", data.imageURL);
  productData.append("title", data.title);
  productData.append("desc", data.desc);
  productData.append("price", data.price);
  productData.append("discount", data.discount);
  productData.append("discountTo", data.discountTo);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  await axios
    .post(`${baseURL}/products`, productData)
    .then((res) => {
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: res.data });
      InfoMessage("success", "Product added successfully!");
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_ERROR, payload: err.message });
      InfoMessage("error", err.message);
    });
};

export const editProduct = (productID, data) => async (dispatch) => {
  dispatch({ type: PRODUCT_START });

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  await axios
    .put(`${baseURL}/products/${productID}`, data)
    .then((res) => {
      dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: res.data });
      InfoMessage("success", "Product edited successfully!");
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_ERROR, payload: err.message });
      InfoMessage("error", err.message);
    });
};

export const deleteProduct = (productID) => async (dispatch) => {
  dispatch({ type: PRODUCT_START });

  await axios
    .delete(`${baseURL}/products/${productID}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: productID });
      InfoMessage("success", "Product deleted successfully!");
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_ERROR, payload: err.message });
      InfoMessage("error", err.message);
    });
};

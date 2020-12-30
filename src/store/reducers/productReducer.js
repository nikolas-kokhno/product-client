import {
  PRODUCT_START,
  PRODUCT_ERROR,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_SUCCESS,
} from "../types/product.types";

const initialState = {
  loading: false,
  errors: null,
  items: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_START:
      return { ...state, loading: true, errors: false };
    case PRODUCT_ERROR:
      return { ...state, loading: false, errors: payload };
    case PRODUCT_FETCH_SUCCESS:
      return { ...state, loading: false, items: payload };
    case PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, items: [...state.items, payload] };
    case PRODUCT_EDIT_SUCCESS:
      return { ...state, loading: false };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items.filter((item) => item.productId !== payload)],
      };

    default:
      return state;
  }
};

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../store/actions";
import EmptyProduct from "../components/emptyProduct";
import ListProducts from "../components/listProducts";
import Loader from "../components/loader";

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((data) => {
    return data.products;
  });

  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="products">
      {products.loading ? (
        <Loader />
      ) : products.items.length !== 0 ? (
        <ListProducts productsData={products.items} />
      ) : (
        <EmptyProduct />
      )}
    </div>
  );
};

export default ProductPage;

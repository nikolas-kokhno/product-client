import React from "react";
import { Row } from "antd";
import ProductCard from "./cardProduct";

const ListProducts = ({ productsData }) => {
  return (
    <div className="products__list">
      <div className="products__list-container">
        <Row gutter={[16, 16]}>
          {productsData.map((item) => (
            <ProductCard productData={item} key={item.productId} />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ListProducts;

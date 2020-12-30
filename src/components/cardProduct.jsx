import React from "react";
import { useDispatch } from "react-redux";

import { Col, Card, Popconfirm } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { deleteProduct } from "../store/actions";
import { Link } from "react-router-dom";

const ProductCard = ({ productData }) => {
  const dispatch = useDispatch();

  const calculatePrice = (price, percent) => {
    return parseInt(price) - (parseInt(price) / 100) * parseInt(percent);
  };

  const calculateDiscountDate = (discountTo) => {
    const dateNow = new Date();
    const dateDisc = new Date(discountTo);

    return Math.ceil(
      Math.abs(dateNow.getTime() - dateDisc.getTime()) / (1000 * 3600 * 24)
    );
  };

  return (
    <Col span={6}>
      <Card
        className="products__item"
        title={productData.title}
        extra={
          <>
            <Link to={{ pathname: "/products/edit", value: { productData } }}>
              <EditFilled style={{ marginRight: "10px" }} />
            </Link>
            <Popconfirm
              title="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => dispatch(deleteProduct(productData.productId))}
            >
              <DeleteFilled />
            </Popconfirm>
          </>
        }
        actions={[
          <p>
            <strong>Discount:</strong>{" "}
            {parseInt(productData.discount) <= 0
              ? "is absent"
              : `${productData.discount}%`}
          </p>,
          <p>
            <strong>Days left:</strong>{" "}
            {parseInt(productData.discount) <= 0
              ? "is absent"
              : `${calculateDiscountDate(productData.discountTo)}`}
          </p>,
        ]}
      >
        <div className="products__item-body">
          <div className="products__item-img">
            <img
              src={productData.imageURL}
              alt="product img"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <p>
            <strong>Description:</strong>{" "}
            {productData.desc === "" ? "is absent" : productData.desc}
          </p>
          <p>
            <strong>Price:</strong>{" "}
            {parseInt(productData.discount) === 0 ? (
              <span>{productData.price}$</span>
            ) : (
              <>
                <strike style={{ marginRight: "5px" }}>
                  {productData.price}$
                </strike>
                <strong>
                  {calculatePrice(productData.price, productData.discount)}$
                </strong>
              </>
            )}
          </p>
        </div>
      </Card>
    </Col>
  );
};

export default ProductCard;

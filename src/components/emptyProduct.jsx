import React from "react";

import { Button, Empty } from "antd";
import { Link } from "react-router-dom";

const EmptyProduct = () => {
  return (
    <div className="products__empty">
      <Empty
        description={
          <>
            <h2>Sorry, no products have been found at this time &#128533;</h2>
            <span>
              &#128071; But you can create it by clicking the button below
              &#128071;
            </span>
          </>
        }
      >
        <Button type="primary">
          <Link to="/products/new">Create new product</Link>
        </Button>
      </Empty>
    </div>
  );
};

export default EmptyProduct;

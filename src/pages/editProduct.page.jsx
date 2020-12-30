import React from "react";
import { Link } from "react-router-dom";

import EditProductForm from "../components/editProductForm";

const EditProductPage = () => {
  return (
    <div className="products__edit">
      <div className="products__edit-title" style={{ display: "flex" }}>
        <Link to="/products">Back</Link>
        <h4 style={{ marginLeft: "10px" }}>Edit product form</h4>
      </div>
      <EditProductForm />
    </div>
  );
};

export default EditProductPage;

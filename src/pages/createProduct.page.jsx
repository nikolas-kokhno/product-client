import React from "react";

import CreateProductForm from "../components/createProductForm";

const CreateProductPage = () => {
  return (
    <div className="products__create">
      <div className="products__create-title">
        <h4>Create product form</h4>
      </div>
      <CreateProductForm />
    </div>
  );
};

export default CreateProductPage;

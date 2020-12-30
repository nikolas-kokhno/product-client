import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="loader">
      <Spin size="large" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;

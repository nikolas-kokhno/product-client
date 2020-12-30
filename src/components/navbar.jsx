import React from "react";

import { useDispatch } from "react-redux";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { logout } from "../store/actions";

const { Header } = Layout;

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ textAlign: "right" }}
      >
        <Menu.Item key="1">
          <Link to="/products">List Product</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/products/new">Create product</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/login" onClick={() => dispatch(logout())}>
            Log out
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;

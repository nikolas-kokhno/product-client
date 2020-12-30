import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/navbar";
import {
  LoginPage,
  ProductPage,
  CreateProductPage,
  EditProductPage,
} from "./pages";
import { saveJWT } from "./store/actions";

const App = () => {
  const dispatch = useDispatch();
  const loggetIn = useSelector((data) => {
    return data.auth.loggetIn;
  });
  let routes;

  // this is a demo auth
  if (localStorage.getItem("token")) {
    dispatch(saveJWT(localStorage.getItem("token")));
  }

  if (!loggetIn) {
    routes = (
      <>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </>
    );
  } else {
    routes = (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/products">
            <ProductPage />
          </Route>
          <Route exact path="/products/new">
            <CreateProductPage />
          </Route>
          <Route exact path="/products/edit">
            <EditProductPage />
          </Route>
          <Redirect to="/products/new" />
        </Switch>
      </>
    );
  }

  return <Router>{routes}</Router>;
};

export default App;

import React from "react";

import LoginForm from "../components/loginForm";

const LoginPage = () => {
  return (
    <div className="login">
      <div className="login__title">
        <h4>Login page</h4>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

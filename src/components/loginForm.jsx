import React from "react";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import { login } from "../store/actions";

const initialValues = {
  email: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email field is required")
    .email("Field must be of type email")
    .min(5, "Field must be at least 8 characters long"),
  password: Yup.string()
    .required("Password field is required")
    .min(8, "Field must be at least 8 characters long"),
});

const LoginForm = () => {
  const authState = useSelector(({ auth }) => {
    return auth;
  });
  const dispatch = useDispatch();

  return (
    <div className="login__form">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(login(values));
          resetForm({});
          setSubmitting(false);
        }}
      >
        {({ isValid }) => (
          <Form>
            <Form.Item name="email" showValidateSuccess={true}>
              <Input name="email" placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" showValidateSuccess={true}>
              <Input name="password" placeholder="Password" />
            </Form.Item>
            <div className="login__form-btn">
              <SubmitButton
                type="primary"
                disabled={!isValid}
                loading={authState.loading}
              >
                Log In
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;

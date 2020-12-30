import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { Checkbox, Form, Input, SubmitButton, DatePicker } from "formik-antd";
import { createProduct } from "../store/actions";

const initialValues = {
  title: "",
  desc: "",
  price: 0,
  imageURL: null,
  onDiscount: false,
  discount: 0,
  discountTo: 0,
};

const ProductSchema = Yup.object().shape({
  title: Yup.string()
    .required("This field is required")
    .min(20, "Field must be at least 20 characters long")
    .max(60, "Maximum length is no more than 80 characters"),
  desc: Yup.string().max(200, "Maximum length is no more than 200 characters"),
  price: Yup.number()
    .required("This field is required")
    .positive("A price can't start with a minus")
    .min(1, "The minimum price cannot be less than $ 1")
    .max(99999999.99, "The maximum price cannot be more than $ 99999999.99"),
  imageURL: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "File size too large, max file size is 2 Mb",
      (file) => file && file.size <= 2100000
    )
    .test(
      "fileType",
      "Incorrect file type",
      (file) =>
        file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
    ),
  onDiscount: Yup.boolean(),
  discount: Yup.number().when("onDiscount", {
    is: true,
    then: Yup.number()
      .required("This field is required")
      .min(10, "Minimum discount percentaget - 10")
      .max(90, "Maximum discount percentaget - 90"),
  }),
  discountTo: Yup.date("Choose a date or enter it in a suitable format").when(
    "onDiscount",
    {
      is: true,
      then: Yup.date("Choose a date or enter it in a suitable format").min(
        new Date(),
        "Discount date cannot be in the past tense"
      ),
    }
  ),
});

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const [discountShow, setDiscountShow] = React.useState(false);
  const productsState = useSelector(({ products }) => {
    return products;
  });

  return (
    <div className="products__create-form">
      <Formik
        initialValues={initialValues}
        validationSchema={ProductSchema}
        onSubmit={async (values, { resetForm }) => {
          await dispatch(createProduct(values));
          resetForm();
        }}
      >
        {({ isValid, setFieldValue }) => (
          <Form>
            <Form.Item
              name="title"
              showValidateSuccess={true}
              label="Title&nbsp;"
            >
              <Input
                name="title"
                placeholder="Start typing to create a title..."
              />
            </Form.Item>
            <Form.Item name="price" showValidateSuccess={true} label="Price">
              <Input name="price" placeholder="Price product" />
            </Form.Item>
            <Form.Item name="desc" showValidateSuccess={true} label="Desc">
              <Input
                name="desc"
                placeholder="Start typing to create a desc..."
              />
            </Form.Item>
            <Form.Item name="imageURL" label="Image">
              <input
                id="file"
                name="imageURL"
                type="file"
                onChange={(event) => {
                  setFieldValue("imageURL", event.target.files[0]);
                }}
              />
            </Form.Item>
            <Form.Item name="onDiscount">
              <Checkbox
                name="onDiscount"
                checked={discountShow}
                onChange={() => setDiscountShow(!discountShow)}
              >
                Enable discount
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="discount"
              showValidateSuccess={true}
              label="Discount"
              style={{ display: discountShow ? "flex" : "none" }}
            >
              <Input name="discount" placeholder="Discount product" />
            </Form.Item>
            <Form.Item
              name="discountTo"
              showValidateSuccess={true}
              style={{ display: discountShow ? "flex" : "none" }}
              label="Discon to"
            >
              <DatePicker
                name="discountTo"
                showTime={true}
                placeholder="DatePicker"
                style={{ width: "347px" }}
              />
            </Form.Item>
            <div className="products__create-btn">
              <SubmitButton
                type="primary"
                loading={productsState.loading}
                disabled={false}
                style={{ marginTop: "20px" }}
              >
                Create new
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductForm;

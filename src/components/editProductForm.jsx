import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import { Checkbox, Form, Input, SubmitButton, DatePicker } from "formik-antd";
import { editProduct } from "../store/actions";

const img = new Image();

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
  changeImg: Yup.boolean(),
  imageURL: Yup.mixed().when("changeImg", {
    is: true,
    then: Yup.mixed()
      .test(
        "fileType",
        "Incorrect file type",
        (file) =>
          file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
      )
      .test(
        "fileSizeMin",
        "The height and width of the picture must be greater than 200px",
        (file) => {
          let binaryData = [];
          binaryData.push(file);
          img.src = window.URL.createObjectURL(new Blob(binaryData));
          return img.width > 200 && img.height > 200;
        }
      )
      .test(
        "fileSizeMax",
        "The height and width of the picture should not exceed 4000px",
        (file) => {
          let binaryData = [];
          binaryData.push(file);
          img.src = window.URL.createObjectURL(new Blob(binaryData));
          return img.width < 4000 && img.height < 4000;
        }
      ),
  }),
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

const EditProductForm = () => {
  let Location = useLocation();
  const dispatch = useDispatch();
  let editData = Location.value.productData;
  const [discountShow, setDiscountShow] = React.useState(false);
  const [imgEditShow, setEditImgShow] = React.useState(false);

  return (
    <div className="products__edit-form">
      <Formik
        initialValues={editData}
        validationSchema={ProductSchema}
        onSubmit={async (values) => {
          await dispatch(editProduct(editData.productId, values));
        }}
      >
        {({ setFieldValue }) => (
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
            <Form.Item name="changeImg">
              <Checkbox
                name="changeImg"
                checked={imgEditShow}
                onChange={() => setEditImgShow(!imgEditShow)}
              >
                Change img
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="imageURL"
              style={{ display: imgEditShow ? "flex" : "none" }}
            >
              <input
                id="file"
                name="imageURL"
                type="file"
                for="changeImg"
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
                disabledTime
                placeholder="DatePicker"
                style={{ width: "347px" }}
              />
            </Form.Item>
            <div className="products__create-btn">
              <SubmitButton
                type="primary"
                loading={false}
                disabled={false}
                style={{ marginTop: "20px" }}
              >
                Edit data
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProductForm;

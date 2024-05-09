import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Routes, Route, useParams } from 'react-router-dom';
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  picked: Yup.string().required('Required'),
  checked: Yup.array().min(2, 'dff').required('Required'),

});

export const ValidationSchemaExample = () => {
  const [items, setItems] = useState([]);
  console.log("dff", items)
  let { firstName } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  console.log("s", firstName)
  const value = items.find((val) => val.firstName === firstName)
  console.log("va", value)
  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // const handleImageChange = (event, setFieldValue) => {
  //   const file = event.currentTarget.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //     setFieldValue('image', ''); 
  //     reader.onload = (e) => {
  //       setFieldValue('image', e.target.result); 
  //     };
  //   }
  // };
  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      localStorage.setItem('recent-image', reader.result)
    })
    reader.readAsDataURL(file);
  }
  return (<>
    <div>
      <h1>Signup</h1>

      <Formik
        enableReinitialize
        initialValues={{
          firstName: value?.firstName || '',
          lastName: value?.lastName || '',
          email: value?.email || '',
          picked: value?.picked || '',
          checked: value?.checked || [],
          image: value?.image || '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("k", values);
          if (value !== undefined) {
            const clone = [...items];
            const findIndex = items.findIndex((val) => val.firstName === firstName)
            clone[findIndex] = { ...values }
            setItems(clone)
          } else {

            setItems(prevItems => [...prevItems, values]);
            resetForm();
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <label>name</label>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}
            <label>redio</label>
            <label>
              <Field type="radio" name="picked" value="One" />
              One
            </label>
            <label>
              <Field type="radio" name="picked" value="Two" />
              Two
            </label>
            {errors.picked && touched.picked ? (
              <div>{errors.picked}</div>
            ) : null}
            <label>name</label>
            <label>
              <Field type="checkbox" name="checked" value="One" />
              One
            </label>
            <label>
              <Field type="checkbox" name="checked" value="Two" />
              Two
            </label>
            <label>
              <Field type="checkbox" name="checked" value="Three" />
              Three
            </label>
            {errors.checked && touched.checked ? (
              <div>{errors.checked}</div>
            ) : null}
            <label>Lastname</label>
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}
            <label>Email</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <label>Upload Image</label>
            <input
              name="image"
              type="file"
              onChange={(event) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                  setFieldValue('image', reader.result)
                })
                setImagePreview(URL.createObjectURL(event.target.files[0]))
                reader.readAsDataURL(event.target.files[0]);

              }}
            />
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px' }} />}
            {errors.image && touched.image ? <div>{errors.image}</div> : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div></>)

};
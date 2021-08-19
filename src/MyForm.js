
import React from "react";
import emailjs from 'emailjs-com';
import { useFormik } from "formik";
import * as Yup from "yup";
export default function MyForm() {
  
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName:"",
      email: "",
      phone: "",
    },
    
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Mininum 2 characters")
        .required("Required!")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        lastName: Yup.string()
        .min(2, "Mininum 2 characters")
        .required("Required!")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
.min(10, 'Must be exactly 10 digits')
.max(10, 'Must be exactly 10 digits')
        .required("Required!")
      
    }),
    
    onSubmit: values => {

      var templateParams = {
        firstName: values.firstName,
        lastName: values.lastName,
        email:values.email,
        phone:values.phone
    };
     debugger
    emailjs.send('service_wxrwh8i', 'template_1168wif', templateParams,'user_PUQcFFacFso9uYFM3gxPP')
        .then(function(response) {
            
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
      
      
      alert("has been sent successfully")
    //   alert(JSON.stringify(values, null, 2));
    }
  });
  

  return (
    <div >
      <h1>Jones Form</h1>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {formik.errors.firstName && formik.touched.firstName && (
            <p>{formik.errors.firstName}</p>
          )}
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName && formik.touched.lastName && (
            <p>{formik.errors.lastName}</p>
          )}
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p>{formik.errors.phone}</p>
          )}
        </div>
        <div>
          
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
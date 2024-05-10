import './RegistrationForm.css';

import type { FormikHelpers, FormikValues } from 'formik';
import { ErrorMessage, Field, Formik } from 'formik';
import React from 'react';

import { countries } from '../../utils/country';
import { registrationFormSchema } from './validationSchema';

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

const RegistrationForm: React.FC = () => {
  const initialValues: FormValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  };

  const handleSubmit = (values: FormikValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="main">
      <Formik initialValues={initialValues} validationSchema={registrationFormSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors, handleSubmit }) => (
          <form className="registration-form" onSubmit={handleSubmit}>
            <h1 className="registration-form-title">Registration Form</h1>
            <div className="registration-form-block">
              <div className="registration-form-wrapper">
                <label className="registration-form-label">Email</label>
                <Field
                  className={`registration-form-inp ${touched.email && errors.email ? 'input-err' : ''}`}
                  type="email"
                  name="email"
                />
              </div>
              <ErrorMessage className="registration-form-error" name="email" component="div" />
            </div>

            <div className="registration-form-block">
              <div className="registration-form-wrapper">
                <label className="registration-form-label">Password</label>
                <Field
                  className={`registration-form-inp ${touched.password && errors.password ? 'input-err' : ''}`}
                  type="password"
                  name="password"
                />
              </div>
              <ErrorMessage className="registration-form-error" name="password" component="div" />
            </div>

            <div className="registration-form-block">
              <div className="registration-form-wrapper">
                <label className="registration-form-label">First Name</label>
                <Field
                  className={`registration-form-inp ${touched.firstName && errors.firstName ? 'input-err' : ''}`}
                  type="text"
                  name="firstName"
                />
              </div>
              <ErrorMessage className="registration-form-error" name="firstName" component="div" />
            </div>

            <div className="registration-form-block">
              <div className="registration-form-wrapper">
                <label className="registration-form-label">Last Name</label>
                <Field
                  className={`registration-form-inp ${touched.lastName && errors.lastName ? 'input-err' : ''}`}
                  type="text"
                  name="lastName"
                />
              </div>
              <ErrorMessage className="registration-form-error" name="lastName" component="div" />
            </div>

            <div className="registration-form-block">
              <div className="registration-form-wrapper">
                <label className="registration-form-label">Date of Birth</label>
                <Field
                  className={`registration-form-inp ${touched.dob && errors.dob ? 'input-err' : ''}`}
                  type="date"
                  name="dob"
                />
              </div>
              <ErrorMessage className="registration-form-error" name="dob" component="div" />
            </div>

            <div className="registration-form-block">
              <div className="registration-form-wrapper">
                <label className="registration-form-label">Street</label>
                <Field
                  className={`registration-form-inp ${touched.street && errors.street ? 'input-err' : ''}`}
                  type="text"
                  name="street"
                />
              </div>
              <ErrorMessage className="registration-form-error" name="street" component="div" />
            </div>

            <div className="registration-form-block">
              <div className="registration-form-wrapper">
                <label className="registration-form-label">City</label>
                <Field
                  className={`registration-form-inp ${touched.city && errors.city ? 'input-err' : ''}`}
                  type="text"
                  name="city"
                />
              </div>
              <ErrorMessage className="registration-form-error" name="city" component="div" />
            </div>

            <div className="registration-form-block">
              <div className="registration-form-wrapper">
                <label className="registration-form-label">Postal Code</label>
                <Field
                  className={`registration-form-inp ${touched.postalCode && errors.postalCode ? 'input-err' : ''}`}
                  type="text"
                  name="postalCode"
                />
              </div>
              <ErrorMessage className="registration-form-error" name="postalCode" component="div" />
            </div>

            <div className="registration-form-block">
              <div className="registration-form-wrapper">
                <label className="registration-form-label">Country</label>
                <Field
                  className={`registration-form-inp ${touched.country && errors.country ? 'input-err' : ''}`}
                  as="select"
                  name="country"
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {countries.map((country) => (
                    <option key={country.alpha2Code} value={country.alpha2Code}>
                      {country.name}
                    </option>
                  ))}
                </Field>
              </div>
              <ErrorMessage className="registration-form-error" name="country" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;

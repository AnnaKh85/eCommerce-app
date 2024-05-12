import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
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

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    // console.log(values);
    setSubmitting(false);
  };

  return (
    <Box width={400} display="flex" flexDirection="column" margin="0 auto" alignItems="center">
      <Formik initialValues={initialValues} validationSchema={registrationFormSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors }) => (
          <Form className="registration-form">
            <h1 className="registration-form-title">Registration</h1>

            <Field
              as={TextField}
              label="Email"
              name="email"
              helperText={touched.email ? errors.email : ''}
              error={touched.email && Boolean(errors.email)}
              margin="normal"
              fullWidth
              variant="standard"
            />

            <Field
              as={TextField}
              type="password"
              label="Password"
              name="password"
              helperText={touched.password ? errors.password : ''}
              error={touched.password && Boolean(errors.password)}
              margin="normal"
              fullWidth
              variant="standard"
            />

            <Field
              as={TextField}
              label="First Name"
              name="firstName"
              helperText={touched.firstName ? errors.firstName : ''}
              error={touched.firstName && Boolean(errors.firstName)}
              margin="normal"
              fullWidth
              variant="standard"
            />

            <Field
              as={TextField}
              label="Last Name"
              name="lastName"
              helperText={touched.lastName ? errors.lastName : ''}
              error={touched.lastName && Boolean(errors.lastName)}
              margin="normal"
              fullWidth
              variant="standard"
            />

            <Field
              as={TextField}
              type="date"
              label="Date of Birth"
              name="dob"
              InputLabelProps={{ shrink: true }}
              helperText={touched.dob ? errors.dob : ''}
              error={touched.dob && Boolean(errors.dob)}
              margin="normal"
              fullWidth
              variant="standard"
            />

            <Field
              as={TextField}
              label="Street"
              name="street"
              helperText={touched.street ? errors.street : ''}
              error={touched.street && Boolean(errors.street)}
              margin="normal"
              fullWidth
              variant="standard"
            />

            <Field
              as={TextField}
              label="City"
              name="city"
              helperText={touched.city ? errors.city : ''}
              error={touched.city && Boolean(errors.city)}
              margin="normal"
              fullWidth
              variant="standard"
            />

            <Field
              as={TextField}
              label="Postal Code"
              name="postalCode"
              helperText={touched.postalCode ? errors.postalCode : ''}
              error={touched.postalCode && Boolean(errors.postalCode)}
              margin="normal"
              fullWidth
              variant="standard"
            />

            <FormControl fullWidth margin="normal" error={touched.country && Boolean(errors.country)}>
              <InputLabel>Country</InputLabel>
              <Field as={Select} name="country" label="Country" displayEmpty variant="standard">
                <MenuItem value="" disabled>
                  Choose one
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.alpha2Code} value={country.alpha2Code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Field>
              {touched.country && errors.country && <FormHelperText>{errors.country}</FormHelperText>}
            </FormControl>

            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegistrationForm;

import { Box, Button, TextField } from '@mui/material';
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import React from 'react';

import { loginFormSchema } from './validateLogin';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const initValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Box width={400} display="flex" flexDirection="column" margin="0 auto" alignItems="center">
      <Formik initialValues={initValues} validationSchema={loginFormSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors }) => (
          <Form>
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

            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
              Log in
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;

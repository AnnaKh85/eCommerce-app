import { Box, Button, TextField } from '@mui/material';
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { HOME_ROUTE, REGISTRATION_ROUTE } from '../../services/constants';
import { useAuth } from './AuthContext';
import { loginFormSchema } from './validateLogin';

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const initValues: LoginFormValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(HOME_ROUTE);
    } else {
      console.debug(`isAuthenticated: ${isAuthenticated}`);
    }
  }, [isAuthenticated]);

  const handleSubmit = (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    login(values);
    console.log('LOGIN handleSubmit: ', values);
    console.log('isAuthenticated:', isAuthenticated);
    // setAuth(values);
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

            <Box
              width={400}
              my={4}
              display="flex"
              flexDirection="row"
              margin="0 auto"
              alignItems="center"
              gap={4}
              p={2}
            >
              <p>Do not have an account ? </p>
              <Link to={REGISTRATION_ROUTE}>Register now</Link>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;

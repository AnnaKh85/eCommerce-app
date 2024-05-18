import { Box, Button, TextField, Typography } from '@mui/material';
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ApiError } from '../../services/api/apiError';
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

  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(HOME_ROUTE);
    } else {
      console.debug(`isAuthenticated: ${isAuthenticated}`);
    }
  }, [isAuthenticated]);

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    setSubmitting(true);
    setServerError('');
    try {
      await login(values);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.responseError.statusCode === 401) {
          setServerError(error.message);
          console.log('console ERROR: ', error);
        } else {
          setServerError(error.message);
          console.log('setServerError(error.message): ', error.message);
        }
      } else {
        setServerError('Incorrect email or password');
      }
      console.log('last console ERROR: ', error);
    }
    setSubmitting(false);
  };

  return (
    <Box width={400} display="flex" flexDirection="column" margin="0 auto" alignItems="center">
      <Formik initialValues={initValues} validationSchema={loginFormSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors }) => (
          <Form>
            {serverError && (
              <div>
                <Typography variant="body1" color="error" fontWeight="bold">
                  {serverError}
                </Typography>
              </div>
            )}
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

            <Button
              sx={{ marginTop: '30px', marginBottom: '30px' }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
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

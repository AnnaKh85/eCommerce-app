import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ApiError } from '../../services/api/apiError';
import createCustomer from '../../services/api/createCustomer.ts';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../services/constants.ts';
import type { BaseAddress, CustomerDraft } from '../../services/interfaces';
import { countries } from '../../utils/country';
import { AuthContext } from '../login/AuthContext.tsx';
import CustomSnackbar from '../registration-response/Snackbar.tsx';
import { registrationFormSchema } from './validationSchema';

interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}
interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  address: Address;
  billingAddress: Address;
  shippingAddress: Address;
  defaultShippingAddress: boolean;
  defaultBillingAddress: boolean;
  sameAddress: boolean;
}

const RegistrationForm = () => {
  const initialValues: FormValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
    shippingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
    billingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
    defaultShippingAddress: false,
    defaultBillingAddress: false,
    sameAddress: false,
  };

  const [serverError, setServerError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      handleRegistrationSuccess();
    } else {
      console.debug(`isAuthenticated: ${isAuthenticated}`);
    }
  }, [isAuthenticated]);

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    const address: BaseAddress = {
      country: values.address.country,
      streetName: values.address.street,
      postalCode: values.address.postalCode,
      city: values.address.city,
    };
    const shippingAddress: BaseAddress = {
      country: values.shippingAddress.country,
      streetName: values.shippingAddress.street,
      postalCode: values.shippingAddress.postalCode,
      city: values.shippingAddress.city,
    };

    let billingAddress: BaseAddress;

    if (values.sameAddress === false) {
      billingAddress = {
        country: values.billingAddress.country,
        streetName: values.billingAddress.street,
        postalCode: values.billingAddress.postalCode,
        city: values.billingAddress.city,
      };
    } else {
      billingAddress = shippingAddress;
    }

    const addresses = [address, shippingAddress, billingAddress];
    const shippingAddressIndex = 1;
    const billingAddressIndex = 2;

    const customerDraft: CustomerDraft = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dob.toString(),
      addresses: addresses,
      shippingAddresses: [shippingAddressIndex],
      billingAddresses: [billingAddressIndex],
    };

    if (values.defaultShippingAddress === true) {
      customerDraft.defaultShippingAddress = shippingAddressIndex;
    }
    if (values.defaultBillingAddress === true) {
      customerDraft.defaultBillingAddress = billingAddressIndex;
    }
    setSubmitting(true);
    setServerError('');
    try {
      await createCustomer(customerDraft);
      login(values);
      console.log('user entered with values:', values);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.responseError.statusCode === 401) {
          setServerError('Something went wrong. Try to reload page!');
        } else {
          setServerError(error.message);
        }
      } else {
        setServerError('Something went wrong');
      }
      console.log(error);
    }
    setSubmitting(false);
  };

  const handleRegistrationSuccess = () => {
    setSnackbarMessage(`Customer was registered!`);
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate(HOME_ROUTE);
    }, 3000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box width={400} display="flex" flexDirection="column" margin="0 auto" alignItems="center">
      <Formik initialValues={initialValues} validationSchema={registrationFormSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors, values }) => (
          <Form className="registration-form">
            <Typography variant="h4" component="h1" gutterBottom>
              Registration
            </Typography>
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
              sx={{ marginBottom: 2 }}
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
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="standard"
            />

            <Field
              as={TextField}
              label="First Name"
              name="firstName"
              helperText={touched.firstName ? errors.firstName : ''}
              error={touched.firstName && Boolean(errors.firstName)}
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="standard"
            />

            <Field
              as={TextField}
              label="Last Name"
              name="lastName"
              helperText={touched.lastName ? errors.lastName : ''}
              error={touched.lastName && Boolean(errors.lastName)}
              sx={{ marginBottom: 2 }}
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
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="standard"
            />

            <Box maxWidth={600} margin="0 auto">
              <Typography variant="h6" component="h2" gutterBottom sx={{ margin: 2 }}>
                Address
              </Typography>
              <Field
                as={TextField}
                label="Street"
                name="address.street"
                helperText={touched.address?.street ? errors.address?.street : ''}
                error={touched.address?.street && Boolean(errors.address?.street)}
                margin="normal"
                fullWidth
                variant="standard"
              />

              <Field
                as={TextField}
                label="City"
                name="address.city"
                helperText={touched.address?.city ? errors.address?.city : ''}
                error={touched.address?.city && Boolean(errors.address?.city)}
                margin="normal"
                fullWidth
                variant="standard"
              />

              <Field
                as={TextField}
                label="Postal Code"
                name="address.postalCode"
                helperText={touched.address?.postalCode ? errors.address?.postalCode : ''}
                error={touched.address?.postalCode && Boolean(errors.address?.postalCode)}
                margin="normal"
                fullWidth
                variant="standard"
              />

              <FormControl
                fullWidth
                margin="normal"
                error={touched.address?.country && Boolean(errors.address?.country)}
              >
                <InputLabel>Country</InputLabel>
                <Field as={Select} name="address.country" label="Country" displayEmpty variant="standard">
                  <MenuItem value="" disabled>
                    Choose one
                  </MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.alpha2Code} value={country.alpha2Code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Field>
                {touched.address?.country && errors.address?.country && (
                  <FormHelperText>{errors.address?.country}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box maxWidth={600} margin="0 auto">
              <Typography variant="h6" component="h2" gutterBottom sx={{ margin: 2 }}>
                Shipping address
              </Typography>

              <Field
                as={TextField}
                label="Street"
                name="shippingAddress.street"
                helperText={touched.shippingAddress?.street ? errors.shippingAddress?.street : ''}
                error={touched.shippingAddress?.street && Boolean(errors.shippingAddress?.street)}
                margin="normal"
                fullWidth
                variant="standard"
              />

              <Field
                as={TextField}
                label="City"
                name="shippingAddress.city"
                helperText={touched.shippingAddress?.city ? errors.shippingAddress?.city : ''}
                error={touched.shippingAddress?.city && Boolean(errors.shippingAddress?.city)}
                margin="normal"
                fullWidth
                variant="standard"
              />

              <Field
                as={TextField}
                label="Postal Code"
                name="shippingAddress.postalCode"
                helperText={touched.shippingAddress?.postalCode ? errors.shippingAddress?.postalCode : ''}
                error={touched.shippingAddress?.postalCode && Boolean(errors.shippingAddress?.postalCode)}
                margin="normal"
                fullWidth
                variant="standard"
              />

              <FormControl
                fullWidth
                margin="normal"
                error={touched.shippingAddress?.country && Boolean(errors.shippingAddress?.country)}
              >
                <InputLabel>Country</InputLabel>
                <Field as={Select} name="shippingAddress.country" label="Country" displayEmpty variant="standard">
                  <MenuItem value="" disabled>
                    Choose one
                  </MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.alpha2Code} value={country.alpha2Code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Field>
                {touched.shippingAddress?.country && errors.shippingAddress?.country && (
                  <FormHelperText>{errors.shippingAddress?.country}</FormHelperText>
                )}
              </FormControl>

              <Field
                type="checkbox"
                name="defaultShippingAddress"
                as={FormControlLabel}
                control={<Checkbox />}
                label="Set as default shipping address"
              />

              <Field
                type="checkbox"
                name="sameAddress"
                as={FormControlLabel}
                control={<Checkbox />}
                label="Use the same address for both billing and shipping"
              />
            </Box>
            {values.sameAddress === false && (
              <Box maxWidth={600} margin="0 auto">
                <Typography variant="h6" component="h2" gutterBottom sx={{ margin: 2 }}>
                  Billing address
                </Typography>

                <Field
                  as={TextField}
                  label="Street"
                  name="billingAddress.street"
                  helperText={touched.billingAddress?.street ? errors.billingAddress?.street : ''}
                  error={touched.billingAddress?.street && Boolean(errors.billingAddress?.street)}
                  margin="normal"
                  fullWidth
                  variant="standard"
                />

                <Field
                  as={TextField}
                  label="City"
                  name="billingAddress.city"
                  helperText={touched.billingAddress?.city ? errors.billingAddress?.city : ''}
                  error={touched.billingAddress?.city && Boolean(errors.billingAddress?.city)}
                  margin="normal"
                  fullWidth
                  variant="standard"
                />

                <Field
                  as={TextField}
                  label="Postal Code"
                  name="billingAddress.postalCode"
                  helperText={touched.billingAddress?.postalCode ? errors.billingAddress?.postalCode : ''}
                  error={touched.billingAddress?.postalCode && Boolean(errors.billingAddress?.postalCode)}
                  margin="normal"
                  fullWidth
                  variant="standard"
                />

                <FormControl
                  fullWidth
                  margin="normal"
                  error={touched.billingAddress?.country && Boolean(errors.billingAddress?.country)}
                >
                  <InputLabel>Country</InputLabel>
                  <Field as={Select} name="billingAddress.country" label="Country" displayEmpty variant="standard">
                    <MenuItem value="" disabled>
                      Choose one
                    </MenuItem>
                    {countries.map((country) => (
                      <MenuItem key={country.alpha2Code} value={country.alpha2Code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.billingAddress?.country && errors.billingAddress?.country && (
                    <FormHelperText>{errors.billingAddress?.country}</FormHelperText>
                  )}
                </FormControl>

                <Field
                  type="checkbox"
                  name="defaultBillingAddress"
                  as={FormControlLabel}
                  control={<Checkbox />}
                  label="Set as default billing address"
                />
              </Box>
            )}

            <Button
              sx={{ marginTop: '30px', marginBottom: '30px' }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              Register
            </Button>

            <Box display="flex" flexDirection="row" margin="0 auto" alignItems="center" justifyContent="center" gap={4}>
              <p>Already have an account ?</p>
              <Link to={LOGIN_ROUTE}>Log in</Link>
            </Box>
          </Form>
        )}
      </Formik>
      <CustomSnackbar open={snackbarOpen} message={snackbarMessage} handleClose={handleCloseSnackbar} />
    </Box>
  );
};

export default RegistrationForm;

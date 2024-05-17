import * as Yup from 'yup';

export const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    ),
});

export const registrationFormSchema = loginFormSchema.shape({
  firstName: Yup.string()
    .required('First name is required')
    .matches(/^[a-zA-Z]+$/, 'First name must contain only letters'),
  lastName: Yup.string()
    .required('Last name is required')
    .matches(/^[a-zA-Z]+$/, 'Last name must contain only letters'),
  dob: Yup.date()
    .required('Date of birth is required')
    .max(new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000), 'You must be at least 13 years old'),
  street: Yup.string().required('Street is required'),
  city: Yup.string()
    .required('City is required')
    .matches(/^[a-zA-Z\s]*$/, 'City must contain only letters and spaces'),
  country: Yup.string().required('Country is required'),
  postalCode: Yup.string()
    .required('Postal code is required')
    .when('country', {
      is: (value: string) => {
        return value == 'US' || value == 'CA';
      },
      then: (schema) =>
        schema.matches(/^[0-9A-Z]{6}$/, 'Postal code must contain 6 symbols, include numbers and capital letters'),
      otherwise: (schema) => schema.matches(/^\d{5}$/, 'Postal code must contain only numbers, length of 5 symbols'),
    }),
  defaultShippingAddress: Yup.boolean(),
});

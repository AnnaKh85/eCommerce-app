import * as Yup from 'yup';

export const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
  // password: Yup.string()
  // .required('Password is required')
  // .min(8, 'Password must be at least 8 characters')
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  //   'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  // ),
});

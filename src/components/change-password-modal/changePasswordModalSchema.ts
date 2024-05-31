import * as Yup from 'yup';

export const changePasswordModalSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm new password is required'),
});

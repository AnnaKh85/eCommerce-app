import * as Yup from 'yup';

export const validationAddressSchema = Yup.object().shape({
  streetName: Yup.string().required('Street is required'),
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
        schema.matches(
          /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/,
          'Postal code must have the format "A3A 1B1", include numbers and capital letters',
        ),
      otherwise: (schema) => schema.matches(/^\d{5}$/, 'Postal code must contain only numbers, length of 5 symbols'),
    }),
});

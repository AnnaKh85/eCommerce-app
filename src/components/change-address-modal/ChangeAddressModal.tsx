import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';

import type { BaseAddress } from '../../services/interfaces';
import { countries } from '../../utils/country';
import { validationAddressSchema } from './validationSchema';

interface AddressModalProps {
  address: BaseAddress;
  onClose: () => void;
  onSave: (values: BaseAddress) => void;
  onRegistrationSuccess: () => void;
}

const ChangeAddressModal: React.FC<AddressModalProps> = ({ address, onClose, onSave, onRegistrationSuccess }) => {
  return (
    <div>
      <h3 style={{ margin: '0' }}>Change address</h3>
      <Formik
        initialValues={address}
        validationSchema={validationAddressSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSave(values);
          setSubmitting(false);
          onRegistrationSuccess();
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <Field
              as={TextField}
              label="Street"
              name="streetName"
              helperText={touched.streetName ? errors.streetName : ''}
              error={touched.streetName && Boolean(errors.streetName)}
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
            <div className="edit-modal-profile-btn-block">
              <Button type="submit" variant="contained" color="primary">
                Save changes
              </Button>
              <Button type="button" variant="contained" color="primary" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeAddressModal;

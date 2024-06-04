import './EditProfileModal.css';

import { Button, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';

import type { Customer } from '../../services/interfaces';
import { editProfileModalSchema } from './validationSchema';

interface EditModalProps {
  customer: Customer;
  onClose: () => void;
  onSave: (values: Customer) => void;
  onRegistrationSuccess: () => void;
}

const EditProfileModal: React.FC<EditModalProps> = ({ customer, onClose, onSave, onRegistrationSuccess }) => {
  return (
    <div>
      <h2>Change general info</h2>
      <Formik
        initialValues={customer}
        validationSchema={editProfileModalSchema}
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
              name="dateOfBirth"
              InputLabelProps={{ shrink: true }}
              helperText={touched.dateOfBirth ? errors.dateOfBirth : ''}
              error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="standard"
            />
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

export default EditProfileModal;

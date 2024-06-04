import { Button, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';

import type { ChangedPassword } from '../../services/interfaces';
import { changePasswordModalSchema } from './validationSchema';

interface ChangePasswordModalProps {
  onClose: () => void;
  onSave: (values: ChangedPassword) => void;
  onRegistrationSuccess: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onClose, onSave, onRegistrationSuccess }) => {
  return (
    <div>
      <h2>Change password</h2>
      <Formik
        initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
        validationSchema={changePasswordModalSchema}
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
              type="password"
              label="Current password"
              name="currentPassword"
              helperText={touched.currentPassword ? errors.currentPassword : ''}
              error={touched.currentPassword && Boolean(errors.currentPassword)}
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="standard"
            />
            <Field
              as={TextField}
              type="password"
              label="New password"
              name="newPassword"
              helperText={touched.newPassword ? errors.newPassword : ''}
              error={touched.newPassword && Boolean(errors.newPassword)}
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="standard"
            />
            <Field
              as={TextField}
              type="password"
              label="Confirm password"
              name="confirmNewPassword"
              helperText={touched.confirmNewPassword ? errors.confirmNewPassword : ''}
              error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
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

export default ChangePasswordModal;

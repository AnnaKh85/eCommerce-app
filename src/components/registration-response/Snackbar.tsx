import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  handleClose: (_event?: React.SyntheticEvent | Event, reason?: string) => void;
}

export default function CustomSnackbar({ open, message, handleClose }: CustomSnackbarProps) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

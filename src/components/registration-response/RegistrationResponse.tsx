import { Button, Dialog, DialogContent } from '@mui/material';
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationResponse = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <h2>Registration Successful!</h2>
        <p>Your account has been successfully registered.</p>
        <Button onClick={onClose} variant="contained">
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationResponse;

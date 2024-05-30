import { Button, Dialog, DialogContent } from '@mui/material';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateResponse = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <h2>Changes saved successfully!</h2>
        <p>Your profile has been successfully updated.</p>
        <Button onClick={onClose} variant="contained">
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateResponse;

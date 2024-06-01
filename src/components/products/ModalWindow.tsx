import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

interface ModalProps {
  imageUrl: string;
  closeModal: () => void;
}

const ModalWindow: React.FC<ModalProps> = ({ imageUrl, closeModal }) => {
  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>
        Modal Window
        <IconButton aria-label="close" onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <img src={imageUrl} alt="Image" style={{ width: '100%' }} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalWindow;

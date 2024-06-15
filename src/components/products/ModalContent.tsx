import './modalContent.css';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

interface Product {
  name: { [key: string]: string };
  masterVariant: {
    images: { url: string }[];
  };
}

const ModalContent = ({
  product,
  showModal,
  selectedImage,
  currentImageIndex,
  closeModal,
  goToPrevImage,
  goToNextImage,
}: {
  product: Product;
  showModal: boolean;
  selectedImage: string;
  currentImageIndex: number;
  closeModal: () => void;
  goToPrevImage: () => void;
  goToNextImage: () => void;
}) => {
  return (
    <>
      {showModal && (
        <Dialog open={true} onClose={closeModal} className="modal-content-container">
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" className="modal-content-product-name">
              {product.name['en-GB']}
            </Typography>
            <IconButton aria-label="close" onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className="modal-content-dialog-content">
            {product.masterVariant.images.length === 1 ? (
              <img src={selectedImage} alt={product.name['en-GB']} className="modal-content-img" />
            ) : (
              <>
                <IconButton onClick={goToPrevImage} className="modal-content-icon-button-right">
                  <ChevronLeftIcon />
                </IconButton>
                <img
                  src={product.masterVariant.images[currentImageIndex].url}
                  alt={product.name['en-GB']}
                  className="modal-content-img"
                />
                <IconButton onClick={goToNextImage} className="modal-content-icon-button-left">
                  <ChevronRightIcon />
                </IconButton>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ModalContent;

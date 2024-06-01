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
        <Dialog open={true} onClose={closeModal} style={{ padding: '20px' }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" style={{ textAlign: 'left' }}>
              {product.name['en-GB']}
            </Typography>
            <IconButton aria-label="close" onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              overflow: 'auto',
            }}
          >
            {product.masterVariant.images.length === 1 ? (
              <img src={selectedImage} alt={product.name['en-GB']} style={{ maxWidth: '100%' }} />
            ) : (
              <>
                <IconButton onClick={goToPrevImage} style={{ marginRight: '10px', position: 'absolute', left: 0 }}>
                  <ChevronLeftIcon />
                </IconButton>
                <img
                  src={product.masterVariant.images[currentImageIndex].url}
                  alt={product.name['en-GB']}
                  style={{ width: '100%' }}
                />
                <IconButton onClick={goToNextImage} style={{ marginLeft: '10px', position: 'absolute', right: 0 }}>
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

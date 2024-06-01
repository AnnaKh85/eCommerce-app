import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DetailedPageSlider.css';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import { CATALOG_ROUTE } from '../../services/constants.ts';
// import ModalWindow from './ModalWindow';
import { useProduct } from './useProduct.ts';

interface ProductDetailsProps {
  selectedProductId: string | null;
}

function ProductDetailsPage({ selectedProductId }: ProductDetailsProps) {
  const { isLoading, product, error } = useProduct(selectedProductId || '');

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.masterVariant.images.length);
    }
  };

  const goToPrevImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + product.masterVariant.images.length) % product.masterVariant.images.length,
      );
    }
  };

  const openModal = (imageUrl: string) => {
    if (product) {
      const imageIndex = product.masterVariant.images.findIndex((image) => image.url === imageUrl);
      if (imageIndex !== -1) {
        setSelectedImage(imageUrl);
        setCurrentImageIndex(imageIndex);
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!product) return <div>No product found</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Card>
      <Grid container>
        <Grid item xs={6}>
          {product.masterVariant.images.length === 1 ? (
            <img
              src={product.masterVariant.images[0].url}
              alt={product.name['en-GB']}
              style={{ width: '80%' }}
              onClick={() => openModal(product.masterVariant.images[0].url)}
            />
          ) : (
            <Slider {...settings} className="dots-container">
              {product.masterVariant.images.map((image) => (
                <div key={image.url} className="slider-image-container">
                  <div className="image-wrapper">
                    <img
                      src={image.url}
                      alt={product.name['en-GB']}
                      style={{ width: '80%' }}
                      onClick={() => openModal(image.url)}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          )}

          {/* {showModal && <ModalWindow imageUrl={selectedImage} closeModal={closeModal} />} */}
          {showModal && (
            <Dialog open={true} onClose={closeModal}>
              <DialogTitle>
                <Typography variant="h5" style={{ textAlign: 'left' }}>
                  {product.name['en-GB']}
                </Typography>
                <IconButton aria-label="close" onClick={closeModal}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                {product.masterVariant.images.length === 1 ? (
                  <img src={selectedImage} alt={product.name['en-GB']} style={{ width: '100%' }} />
                ) : (
                  <>
                    <IconButton onClick={goToPrevImage}>
                      <ChevronLeftIcon />
                    </IconButton>
                    <img
                      src={product.masterVariant.images[currentImageIndex].url}
                      alt={product.name['en-GB']}
                      style={{ width: '100%' }}
                    />
                    <IconButton onClick={goToNextImage}>
                      <ChevronRightIcon />
                    </IconButton>
                  </>
                )}
              </DialogContent>
            </Dialog>
          )}
        </Grid>
        <Grid item xs={6}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <Typography variant="h5" style={{ textAlign: 'left' }}>
              {product.name['en-GB']}
            </Typography>

            <Grid container justifyContent="left">
              <Grid item style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Typography variant="h6">
                  {product.masterVariant.prices[0].value.centAmount / 100}{' '}
                  {product.masterVariant.prices[0].value.currencyCode}
                </Typography>
                {product.masterVariant.prices[0].discounted?.value.centAmount && (
                  <div>
                    <div
                      style={{
                        color: 'var(--color-text-secondary-main)',
                        backgroundColor: 'var(--color-text-secondary-light)',
                        borderRadius: '5px',
                        padding: '5px',
                        fontSize: '1rem',
                        fontWeight: '700',
                      }}
                    >
                      {Math.round(
                        ((product.masterVariant.prices[0].value.centAmount -
                          product.masterVariant.prices[0].discounted.value.centAmount) /
                          product.masterVariant.prices[0].value.centAmount) *
                          100,
                      )}
                      % off {product.masterVariant.prices[0].discounted.value.centAmount / 100}{' '}
                      {product.masterVariant.prices[0].discounted.value.currencyCode}
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
            <div style={{ width: '100%', borderBottom: '1px solid rgba(169,169,169,0.6)', marginBottom: '10px' }}></div>

            <Typography variant="body1" style={{ textAlign: 'left' }}>
              {product.description['en-GB']}
            </Typography>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Button variant="contained" component={Link} to={CATALOG_ROUTE}>
                  Back to catalog
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProductDetailsPage;

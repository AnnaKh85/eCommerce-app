import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DetailedPageSlider.css';

import { CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import { CATALOG_ROUTE } from '../../services/constants.ts';
import getPromoList from '../promo-codes/promoList.ts';
import ModalContent from './ModalContent';
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
      // console.log('getPromoList');
      getPromoList();
      // console.log(result.results.code);
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
    <Card
      sx={{ display: 'flex', justifyContent: 'center', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sm={6} md={4}>
          {product.masterVariant.images.length === 1 ? (
            <img
              src={product.masterVariant.images[0].url}
              alt={product.name['en-GB']}
              style={{ cursor: 'pointer' }}
              className="product-image"
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
                      style={{ cursor: 'pointer' }}
                      className="product-image"
                      // style={{ width: '70%', cursor: 'pointer' }}
                      onClick={() => openModal(image.url)}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          )}

          <ModalContent
            product={product}
            showModal={showModal}
            selectedImage={selectedImage}
            currentImageIndex={currentImageIndex}
            closeModal={closeModal}
            goToPrevImage={goToPrevImage}
            goToNextImage={goToNextImage}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <Typography variant="h5" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              {product.name['en-GB']}
            </Typography>

            <Grid container sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'left' } }}>
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

            <Typography variant="body1" style={{ textAlign: 'left' }} className="product-description">
              {product.description['en-GB']}
            </Typography>
            <Grid container sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'left' } }}>
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

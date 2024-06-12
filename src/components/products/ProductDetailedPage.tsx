import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DetailedPageSlider.css';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import getCartQuery, { updateMyCart } from '../../services/api/customerCart.ts';
import { CATALOG_ROUTE } from '../../services/constants.ts';
import type { ICart, ICartActions } from '../../services/interfaces.ts';
import { useCart } from '../cart/useCarts.ts';
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

  const queryClient = useQueryClient();
  const { cart } = useCart();
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const goToNextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.masterVariant.images.length);
      getPromoList();
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

  useEffect(() => {
    if (cart && cart.lineItems) {
      const isProductInCart = cart.lineItems.some((item) => item.productId === selectedProductId);
      if (isProductInCart) {
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }
    }
  }, [cart, selectedProductId]);

  const { mutate: addProductToCart } = useMutation({
    mutationFn: ({ id, version, actions }: { id: string; version: number; actions: ICartActions[] }) =>
      updateMyCart(id, version, actions),
    onSuccess: () => {
      toast.success(`The  was added to your cart 🛒`);
      queryClient.invalidateQueries({ queryKey: ['activeCart'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: removeProductFromCart } = useMutation({
    mutationFn: ({ id, version, actions }: { id: string; version: number; actions: ICartActions[] }) =>
      updateMyCart(id, version, actions),
    onSuccess: () => {
      toast.success(`The product has been removed 🧹 from your cart 🛒!`);
      queryClient.invalidateQueries({ queryKey: ['activeCart'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: fetchActiveCart, error: fetchCartError } = useMutation({
    mutationFn: getCartQuery,
    onSuccess: (data: ICart) => {
      if (!data || data.statusCode === 404) {
        toast.error('Something went wrong, please, reload the page or try again later');
      } else {
        handleAddProductToCart(data.id, data.version);
      }
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function handleAddProductToCart(cartId: string, cartVersion: number) {
    if (selectedProductId) {
      const actions: ICartActions[] = [
        {
          action: 'addLineItem',
          productId: selectedProductId,
          variantId: 1,
          quantity: 1,
        },
      ];
      addProductToCart({ id: cartId, version: cartVersion, actions });
    }
  }

  function handleRemoveProductFromCart(cartId: string, cartVersion: number) {
    const itemToRemove = cart?.lineItems.find((item) => item.productId === selectedProductId);
    if (itemToRemove) {
      const actions: ICartActions[] = [
        {
          action: 'removeLineItem',
          lineItemId: itemToRemove.id,
        },
      ];
      removeProductFromCart({ id: cartId, version: cartVersion, actions });
    }
  }

  function handleAddToCart() {
    fetchActiveCart();
  }

  function handleRemoveFromCart() {
    if (cart) {
      handleRemoveProductFromCart(cart.id, cart.version);
    }
  }

  if (fetchCartError) return <div>An error occurred: {fetchCartError.message}</div>;

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
            <Grid container style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <Grid item>
                <Button variant="contained" component={Link} to={CATALOG_ROUTE}>
                  Back to catalog
                </Button>
              </Grid>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <AddShoppingCartIcon
                  onClick={() => {
                    if (!isInCart) {
                      handleAddToCart();
                    }
                  }}
                  style={{ color: isInCart ? 'grey' : 'inherit', cursor: isInCart ? 'not-allowed' : 'pointer' }}
                />
                {isInCart && (
                  <Typography variant="caption" color="text.secondary" sx={{ marginLeft: '5px' }}>
                    In the cart
                  </Typography>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <RemoveShoppingCartIcon
                  onClick={handleRemoveFromCart}
                  style={{ color: isInCart ? 'inherit' : 'grey', cursor: 'pointer' }}
                />
                {isInCart && (
                  <Typography variant="caption" color="text.secondary" sx={{ marginLeft: '5px' }}>
                    Remove from cart
                  </Typography>
                )}
              </div>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProductDetailsPage;

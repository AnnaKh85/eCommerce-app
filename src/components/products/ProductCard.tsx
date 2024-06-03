import './DetailedPageSlider.css';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CardActionArea, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { createCart as createCartApi, getActiveCart, updateMyCart } from '../../services/api/customerCart.ts';
import type { IProduct } from '../../services/interfaces.ts';
import type { ICartActions } from '../../services/interfaces.ts';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const queryClient = useQueryClient();
  const isDiscounted = !!product.masterVariant.prices[0].discounted;

  const { mutate: createCart } = useMutation({
    mutationFn: createCartApi,
    onSuccess: (data) => {
      toast.success('New cart successfully created');
      queryClient.setQueryData(['activeCart'], data);
      handleAddProductToCart(data.id, data.version);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const { mutate: addProductToCart } = useMutation({
    mutationFn: ({ id, version, actions }: { id: string; version: number; actions: ICartActions[] }) =>
      updateMyCart(id, version, actions),
    onSuccess: () => {
      toast.success('The product was added to your cart');
      queryClient.invalidateQueries({ queryKey: ['activeCart'] });
    },
    onError: (err) => toast.error(err.message),
  });

  const {
    isLoading,
    data: activeCart,
    error,
  } = useQuery({
    queryKey: ['activeCart'],
    queryFn: getActiveCart,
    staleTime: Infinity,
  });

  function handleAddProductToCart(cartId: string, cartVersion: number) {
    const actions = [
      {
        action: 'addLineItem',
        productId: product.id,
        variantId: 1,
        quantity: 1,
      },
    ];
    addProductToCart({ id: cartId, version: cartVersion, actions });
  }

  function handleAddToCart() {
    if (!activeCart || activeCart.statusCode === 404) {
      createCart();
    } else {
      handleAddProductToCart(activeCart.id, activeCart.version);
    }
  }

  if (isLoading) return <CircularProgress />;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Card
      sx={{
        width: {
          xs: '200px',
          sm: '300px',
        },
        margin: '10px 0',
        height: {
          xs: '400px',
          sm: '400px',
        },
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.name['en-GB']}
          height="100"
          image={product.masterVariant.images[0].url}
          sx={{
            objectFit: 'contain',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            component="div"
            color="text.primary"
            sx={{
              fontSize: { xs: '0.8rem', sm: '1.3rem' },
              textAlign: { xs: 'center', sm: 'center' },
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name['en-GB']}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.9rem' },
              textAlign: { xs: 'center', sm: 'left' },
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              height: '60px',
            }}
          >
            {product.description['en-GB'] || ''}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '0.8rem', sm: '1rem', fontWeight: '700', margin: '8px' } }}
            color={isDiscounted ? 'text.secondary' : 'text.primary'}
            fontSize={isDiscounted ? '1rem' : '0.8rem'}
            fontWeight={isDiscounted ? '500' : '700'}
            margin={{
              xs: '8px',
              sm: '16px',
            }}
          >
            {product.masterVariant.prices[0].value.centAmount / 100}{' '}
            {product.masterVariant.prices[0].value.currencyCode}
          </Typography>
          {product.masterVariant.prices[0].discounted?.value.centAmount && (
            <div
              style={{
                color: 'var(--color-text-secondary-main)',
                backgroundColor: 'var(--color-text-secondary-light)',
                borderRadius: '5px',
                padding: '5px',
                fontSize: '1rem',
                fontWeight: '700',
                margin: '8px',
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
          )}
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Button size="small" variant="outlined" component={Link} to={`/catalog/${product.id}`}>
            Show more
          </Button>
          <ShoppingCartIcon onClick={handleAddToCart} />
          {/*<Button size="small" variant="contained">*/}
          {/*  Add to cart*/}
          {/*</Button>*/}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;

import './DetailedPageSlider.css';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import getCartQuery, { updateMyCart } from '../../services/api/customerCart.ts';
import type { ICart, ICartActions, IProduct } from '../../services/interfaces.ts';
import { useCart } from '../cart/useCarts.ts';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const queryClient = useQueryClient();
  const { cart } = useCart();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const isDiscounted = product.masterVariant.prices[0] && !!product.masterVariant.prices[0].discounted;

  useEffect(() => {
    if (cart) {
      cart.lineItems.forEach((item) => {
        if (item.productId === product.id) {
          setIsInCart(true);
        }
      });
    }
  }, []);

  const { mutate: addProductToCart } = useMutation({
    mutationFn: ({ id, version, actions }: { id: string; version: number; actions: ICartActions[] }) =>
      updateMyCart(id, version, actions),
    onSuccess: () => {
      toast.success(`The ${product.name['en-GB']} was added to your cart 🛒`);
      queryClient.invalidateQueries({ queryKey: ['activeCart'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      setIsInCart(true);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: fetchActiveCart, error: fetchCartError } = useMutation({
    mutationFn: getCartQuery,
    onSuccess: (data: ICart) => {
      if (!data || data.statusCode === 404) {
        toast.error("You don't have a cart");
      } else {
        handleAddProductToCart(data.id, data.version);
      }
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function handleAddProductToCart(cartId: string, cartVersion: number) {
    const actions: ICartActions[] = [
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
    fetchActiveCart();
  }

  if (fetchCartError) return <div>An error occurred: {fetchCartError.message}</div>;

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
            {product.masterVariant.prices[0] && product.masterVariant.prices[0].value.centAmount / 100}{' '}
            {product.masterVariant.prices[0] && product.masterVariant.prices[0].value.currencyCode}
          </Typography>
          {product.masterVariant.prices[0] && product.masterVariant.prices[0].discounted?.value.centAmount && (
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
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <ShoppingCartIcon
              onClick={handleAddToCart}
              style={{ color: isInCart ? 'grey' : 'inherit', cursor: 'pointer' }}
            />
            {isInCart && (
              <Typography variant="caption" color="text.secondary" sx={{ marginLeft: '5px' }}>
                In the cart
              </Typography>
            )}
          </div>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;

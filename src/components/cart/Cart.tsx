import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { theme } from '../../main.tsx';
import { updateMyCart } from '../../services/api/customerCart.ts';
import { CATALOG_ROUTE } from '../../services/constants.ts';
import type { ILineItem } from '../../services/interfaces.ts';
import type { ICart } from '../../services/interfaces.ts';
import type { ICartActions } from '../../services/interfaces.ts';
import type { PromoResults } from '../../services/interfaces.ts';
import getPromoList from '../promo-codes/promoList';
import { ccyFormat } from './DisplayPrice.tsx';
import DisplayPrice from './DisplayPrice.tsx';
import { useCart } from './useCarts.ts';

export default function Cart() {
  const { cart } = useCart();
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [isPromoApplied, setPromoApplied] = useState(
    sessionStorage.getItem('isPromoApplied') === 'true' ? true : false,
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '1.1rem',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const { mutate: updateCart } = useMutation({
    mutationFn: ({ id, version, actions }: { id: string; version: number; actions: ICartActions[] }) =>
      updateMyCart(id, version, actions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeCart'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleRemoveProductFromCart(cartId: string, cartVersion: number, product: ILineItem) {
    const actions: ICartActions[] = [
      {
        action: 'removeLineItem',
        lineItemId: product.id,
      },
    ];
    updateCart({ id: cartId, version: cartVersion, actions });
  }

  const [promoCode, setPromoCode] = useState(sessionStorage.getItem('promoCode') || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const [promoData, setPromoData] = useState<{ results: PromoResults[] } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPromoList();
        setPromoData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  function handleApplyPromo(cart: ICart) {
    const cartId = cart.id;
    const cartVersion = cart.version;
    const actions: ICartActions[] = [
      {
        action: 'addDiscountCode',
        code: promoCode,
      },
    ];
    if (promoData) {
      for (let i = 0; i < promoData.results.length; i++) {
        console.log('PROMO CODE from loop: ', promoData.results);
        if (promoData.results[i].code === promoCode) {
          console.log('BINGO');
          if (cart && cart.id && cart.version) {
            console.log('updateMyCart!!!');
            updateCart({ id: cartId, version: cartVersion, actions });
            setPromoApplied(true);
            sessionStorage.setItem('promoCode', promoCode);
            console.log('sessionStorage promoCode:', promoCode);
            sessionStorage.setItem('isPromoApplied', 'true');
            return;
          }
        } else {
          console.log('Enter relevant PromoCode');
        }
      }
    }
  }

  useEffect(() => {
    const storedIsPromoApplied = sessionStorage.getItem('isPromoApplied');
    if (storedIsPromoApplied === 'true') {
      setPromoApplied(true);
    }
  }, []);

  function changeQuantity(cartId: string, cartVersion: number, product: ILineItem, quantity: number) {
    const actions: ICartActions[] = [
      {
        action: 'changeLineItemQuantity',
        lineItemId: product.id,
        quantity: quantity,
      },
    ];
    updateCart({ id: cartId, version: cartVersion, actions });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearCart = () => {
    if (cart?.lineItems) {
      const actions: ICartActions[] = cart.lineItems.map((item) => ({
        action: 'changeLineItemQuantity',
        lineItemId: item.id,
        quantity: 0,
      }));
      updateCart({ id: cart.id, version: cart.version, actions });
    }
    handleClose();
  };

  return (
    <Box>
      <Typography variant={'h3'} sx={{ margin: '14px' }}>
        My Cart
      </Typography>
      <Button
        variant="outlined"
        disabled={!cart?.lineItems || cart.lineItems.length === 0}
        onClick={handleClickOpen}
        sx={{ margin: '16px' }}
      >
        Clear Shopping Cart
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Clear my Cart?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">All items from the cart will be removed.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Disagree
          </Button>
          <Button onClick={handleClearCart} autoFocus variant="contained">
            Clear my cart! 🧹
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        {(!cart?.lineItems || cart.lineItems.length === 0) && (
          <div>
            <Typography>Your cart is empty</Typography>
            <Link to={CATALOG_ROUTE}>Start to shopping</Link>
          </div>
        )}
        {cart?.lineItems && cart.lineItems.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell sx={{ textAlign: 'center' }}>Products</StyledTableCell>

                  <StyledTableCell sx={{ textAlign: 'right' }}></StyledTableCell>
                  <StyledTableCell sx={{ textAlign: 'center' }}>Quantity</StyledTableCell>
                  <StyledTableCell sx={{ textAlign: 'left' }}></StyledTableCell>
                  <StyledTableCell sx={{ textAlign: 'center' }}>Price</StyledTableCell>
                  <StyledTableCell sx={{ textAlign: 'center' }}></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.lineItems.map((item: ILineItem) => (
                  <TableRow key={item.productId}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <img src={item.variant.images[0].url} alt={item.name['en-GB']} style={{ height: '50px' }} />
                    </TableCell>
                    <TableCell>{item.name['en-GB']}</TableCell>

                    <TableCell sx={{ textAlign: 'right' }}>
                      <RemoveCircleIcon
                        style={{
                          cursor: item.quantity > 1 ? 'pointer' : 'not-allowed',
                          color: item.quantity > 1 ? 'inherit' : 'grey',
                        }}
                        onClick={() => changeQuantity(cart.id, cart.version, item, item.quantity - 1)}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', fontWeight: '700', fontSize: '1rem' }}>
                      {item.quantity}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'left' }}>
                      <AddCircleIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => changeQuantity(cart.id, cart.version, item, item.quantity + 1)}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1rem',
                        color: item.price.discounted ? theme.palette.secondary.main : 'inherit',
                      }}
                    >
                      {item.price.discounted
                        ? ccyFormat((item.price.discounted.value.centAmount / 100) * item.quantity) +
                          ' (' +
                          Math.round(
                            ((item.variant.prices[0].value.centAmount - item.price.discounted.value.centAmount) /
                              item.variant.prices[0].value.centAmount) *
                              100,
                          ) +
                          '% off)'
                        : ccyFormat((item.variant.prices[0].value.centAmount / 100) * item.quantity)}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <DeleteForeverIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveProductFromCart(cart.id, cart.version, item)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <DisplayPrice
              cart={cart}
              isPromoApplied={isPromoApplied}
              promoCode={promoCode}
              handleChange={handleChange}
              handleApplyPromo={handleApplyPromo}
            />
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

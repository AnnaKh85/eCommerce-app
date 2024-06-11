import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { theme } from '../../main.tsx';
import { updateMyCart } from '../../services/api/customerCart.ts';
import { CATALOG_ROUTE } from '../../services/constants.ts';
import type { ILineItem } from '../../services/interfaces.ts';
import type { ICartActions } from '../../services/interfaces.ts';
import { useCart } from './useCarts.ts';

export default function Cart() {
  const { isLoading, cart, error } = useCart();
  const queryClient = useQueryClient();
  // const theme = useTheme();

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

  function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
  }

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

  return (
    <Box>
      <Typography variant={'h3'} sx={{ margin: '14px' }}>
        My Cart
      </Typography>
      <Box>
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>{error.message}</Typography>}
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
            <Box
              sx={{
                textAlign: 'right',
                margin: '20px',
              }}
            >
              <Typography variant={'h6'} sx={{ margin: '14px' }}>
                Total (without discount): {ccyFormat(cart.totalPrice.centAmount / 100)}
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: 'right',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '20px',
                fontWeight: '700',
                margin: '20px',
              }}
            >
              <TextField label="Enter your promo-code" variant="outlined" />
              <Button variant="contained">Apply</Button>
            </Box>
            <Box sx={{ textAlign: 'right', margin: '24px' }}>
              <Typography variant={'h5'} sx={{ margin: '14px', fontWeight: '700' }}>
                Total: {ccyFormat(cart.totalPrice.centAmount / 100)}
              </Typography>
            </Box>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

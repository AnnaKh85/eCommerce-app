import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { CATALOG_ROUTE } from '../../services/constants.ts';
import type { ILineItem } from '../../services/interfaces.ts';
import { useCart } from './useCarts.ts';

export default function Cart() {
  const { isLoading, cart, error } = useCart();

  return (
    <Box>
      <Typography variant={'h3'}>My Cart</Typography>
      <Box>
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>{error.message}</Typography>}
        {(!cart?.lineItems || cart.lineItems.length === 0) && (
          <div>
            <Typography>Your cart is empty</Typography>
            <Link to={CATALOG_ROUTE}>Start to shopping</Link>
          </div>
        )}
        {cart?.lineItems &&
          cart.lineItems.length > 0 &&
          cart.lineItems.map((item: ILineItem) => <Typography key={item.productId}>{item.name['en-GB']}</Typography>)}
      </Box>
    </Box>
  );
}

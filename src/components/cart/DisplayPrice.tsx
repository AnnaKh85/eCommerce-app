import { Box, Button, TextField, Typography } from '@mui/material';

import type { DisplayPriceProps } from '../../services/interfaces';

export function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

const DisplayPrice = ({ cart, isPromoApplied, promoCode, handleChange, handleApplyPromo }: DisplayPriceProps) => {
  return (
    <>
      <Box sx={{ textAlign: 'right', margin: '20px' }}>
        <Typography variant={'h6'} sx={{ margin: '14px' }}>
          Total (without discount):{' '}
          {ccyFormat(
            (cart.discountOnTotalPrice &&
              cart.discountOnTotalPrice.discountedAmount &&
              cart.discountOnTotalPrice.discountedAmount.centAmount / 10) ??
              cart.totalPrice.centAmount / 100,
          )}
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
        <TextField
          label={isPromoApplied ? 'Promocode' : 'Enter your promo-code'}
          variant="outlined"
          value={promoCode}
          onChange={handleChange}
          disabled={isPromoApplied}
        />
        <Button onClick={() => handleApplyPromo(cart)} autoFocus variant="contained" disabled={isPromoApplied}>
          Apply
        </Button>
      </Box>
      <Box sx={{ textAlign: 'right', margin: '24px' }}>
        {isPromoApplied && (
          <Typography variant={'h5'} sx={{ margin: '14px', fontWeight: '700', color: 'red' }}>
            Promocode:{' - '}
            {ccyFormat(
              (cart.discountOnTotalPrice &&
                cart.discountOnTotalPrice.discountedAmount &&
                cart.discountOnTotalPrice.discountedAmount.centAmount / 10 - cart.totalPrice.centAmount / 100) ??
                0,
            )}
          </Typography>
        )}

        <Typography variant={'h5'} sx={{ margin: '14px', fontWeight: '700' }}>
          Total: {ccyFormat(cart.totalPrice.centAmount / 100)}
        </Typography>
      </Box>
    </>
  );
};

export default DisplayPrice;

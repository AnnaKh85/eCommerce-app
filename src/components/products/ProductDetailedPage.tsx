import { Box, CircularProgress, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { CATALOG_ROUTE } from '../../services/constants.ts';
import { useProduct } from './useProduct.ts';

interface ProductDetailsProps {
  selectedProductId: string | null;
}

function ProductDetailsPage({ selectedProductId }: ProductDetailsProps) {
  const { isLoading, product, error } = useProduct(selectedProductId || '');

  if (isLoading) return <CircularProgress />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">{product.name['en-GB']}</Typography>
      <Typography variant="body1">{product.description['en-GB']}</Typography>
      <Button variant="contained" component={Link} to={CATALOG_ROUTE}>
        Back to catalog
      </Button>
    </Box>
  );
}

export default ProductDetailsPage;

import { CardContent, CircularProgress, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

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
    <Card>
      <CardMedia component="img" alt={product.name['en-GB']} image={product.masterVariant.images[0].url} />
      <CardContent>
        <Typography variant="h5">{product.name['en-GB']}</Typography>
        <Typography variant="body1">{product.description['en-GB']}</Typography>
        <Typography variant="h6">
          {product.masterVariant.prices[0].value.centAmount / 100} {product.masterVariant.prices[0].value.currencyCode}
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
    </Card>
  );
}

export default ProductDetailsPage;

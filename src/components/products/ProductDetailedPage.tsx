import { CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
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
    <Card>
      <Grid container>
        <Grid item xs={6}>
          <CardMedia component="img" alt={product.name['en-GB']} image={product.masterVariant.images[0].url} />
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            <Typography variant="h5">{product.name['en-GB']}</Typography>
            <Typography variant="body1" style={{ textAlign: 'left' }}>
              {product.description['en-GB']}
            </Typography>
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
                <Button variant="contained" component={Link} to={CATALOG_ROUTE}>
                  Back to catalog
                </Button>
              </div>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProductDetailsPage;

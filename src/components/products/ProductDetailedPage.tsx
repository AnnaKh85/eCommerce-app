import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Card>
      <Grid container>
        <Grid item xs={6}>
          {product.masterVariant.images.length === 1 ? (
            <img src={product.masterVariant.images[0].url} alt={product.name['en-GB']} style={{ width: '60%' }} />
          ) : (
            <Slider {...settings} className="slick-dots">
              {product.masterVariant.images.map((image) => (
                <div key={image.url}>
                  <img src={image.url} alt={product.name['en-GB']} style={{ width: '60%' }} />
                </div>
              ))}
            </Slider>
          )}
        </Grid>
        <Grid item xs={6}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <Typography variant="h5" style={{ textAlign: 'left' }}>
              {product.name['en-GB']}
            </Typography>

            <Grid container justifyContent="left">
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

            <Typography variant="body1" style={{ textAlign: 'left' }}>
              {product.description['en-GB']}
            </Typography>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Button variant="contained" component={Link} to={CATALOG_ROUTE}>
                  Back to catalog
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProductDetailsPage;

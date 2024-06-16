import bicycle9 from '@assets/normal_images/bicycle9.jpg';
import { Box, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import type { PromoResults } from '../../services/interfaces';
import getPromoList from '../promo-codes/promoList';

function CardPromoCodes() {
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
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        width: '100%',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <CardContent sx={{ position: 'relative' }}>
          <Card variant="outlined" style={{ border: '0' }}>
            <CardMedia
              sx={{
                height: 500,
                width: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              image={bicycle9}
              title="bicycle2"
            />
            {/* <CardMedia
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
          }} */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontSize: { xs: '1rem', sm: '1.5rem' },
                fontWeight: '500',
                letterSpacing: '2px',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: '#ffeb3b',
                padding: '8px',
                borderRadius: '4px',
                opacity: '0.9',
              }}
            >
              PROMOCODE for summer:
            </Typography>

            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '2.25rem' },
                fontWeight: '800',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#ffeb3b',
                padding: '8px',
                borderRadius: '4px',
                opacity: '0.9',
              }}
            >
              {promoData && promoData.results[0].code}
            </Typography>

            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontSize: { xs: '1rem', sm: '1rem' },
                letterSpacing: '1px',
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#ffeb3b',
                padding: '8px',
                borderRadius: '4px',
                opacity: '0.9',
              }}
            >
              {promoData &&
                promoData.results.map((promo, index: number) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', paddingLeft: '24px' }}>
                    {promo.description && promo.description['en-GB'] ? (
                      <p style={{ marginLeft: '0' }}>{promo.description['en-GB']}</p>
                    ) : (
                      <p>No description</p>
                    )}
                  </div>
                ))}
            </Typography>
          </Card>
        </CardContent>
      </Box>
    </Container>
  );
}

export default CardPromoCodes;

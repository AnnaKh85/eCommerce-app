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
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        width: '100%',
        gap: '20px',
        position: 'relative',
      }}
    >
      {/* <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2.25rem' } }}> */}
      {/* <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2.25rem' },
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '8px',
        }}
      >
        PROMOCODE: {promoData && promoData.results[0].code}
      </Typography> */}

      <Box sx={{ flexGrow: 1 }}>
        <CardContent sx={{ position: 'relative' }}>
          <Card variant="outlined" style={{ border: '0' }}>
            <CardMedia sx={{ height: 400, width: '100%', backgroundSize: 'cover' }} image={bicycle9} title="bicycle2" />
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '2.25rem' },
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: '#ffeb3b',
                padding: '8px',
              }}
            >
              PROMOCODE: {promoData && promoData.results[0].code}
            </Typography>
          </Card>
        </CardContent>

        {promoData &&
          promoData.results.map((promo, index: number) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', paddingLeft: '24px' }}>
              <p style={{ marginRight: '10px' }}>{promo.code}</p>
              {promo.description && promo.description['en-GB'] ? (
                <p style={{ marginLeft: '0' }}>{promo.description['en-GB']}</p>
              ) : (
                <p>No description</p>
              )}
            </div>
          ))}
      </Box>
    </Container>
  );
}

export default CardPromoCodes;

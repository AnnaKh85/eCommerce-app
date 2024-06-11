// import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import getPromoList from '../promo-codes/promoList';

function CardPromoCodes() {
  const [promoData, setPromoData] = useState(null);

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
        margin: '0 auto',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2.25rem' } }}>
        Promo Codes
      </Typography>

      {promoData &&
        promoData.results.map((promo, index) => (
          <div key={index}>
            <p>{promo.code}</p>
            {/* <p>{promo.description[en-GB] || 'No description'}</p> */}
          </div>
        ))}
    </Container>
  );
}

export default CardPromoCodes;

import { Container, Typography } from '@mui/material';
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
        margin: '40px auto',
        width: '100%',
        gap: '20px',
        backgroundColor: 'grey',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2.25rem' } }}>
        PROMO Codes
      </Typography>

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
    </Container>
  );
}

export default CardPromoCodes;

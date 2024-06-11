import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import getPromoList from '../promo-codes/promoList';

interface PromoResults {
  code: string;
  description?: {
    'en-GB': string;
  };
}

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
        promoData.results.map((promo, index: number) => (
          <div key={index}>
            <p>{promo.code}</p>
            {promo.description && promo.description['en-GB'] ? (
              <p>{promo.description['en-GB']}</p>
            ) : (
              <p>No description</p>
            )}
          </div>
        ))}
    </Container>
  );
}

export default CardPromoCodes;

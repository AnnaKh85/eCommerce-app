import bicycle5 from '@assets/normal_images/bicycle5.jpg';
import bicycle115 from '@assets/small_images/bicycle115.jpg';
import spare_parts from '@assets/small_images/spare_parts.jpg';
import { Box, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { ABOUT_US, CART_ROUTE, CATALOG_ROUTE } from '../../services/constants';

function CardMammagamma() {
  return (
    <Container
      sx={{
        display: 'flex',
        margin: '0 auto',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <Box position="relative">
        <Grid container spacing={1}>
          <Grid item xs={8} alignItems={'center'} justifyContent={'center'}>
            <Link to={ABOUT_US}>
              <img
                alt="bicycle115"
                src={bicycle115}
                style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontSize: '24px',
                }}
              >
                ABOUT US
              </div>
            </Link>
          </Grid>
          <Grid item xs={4} alignItems={'center'} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <Grid item xs={12}>
              <Link to={CATALOG_ROUTE}>
                <img
                  alt="bicycle5"
                  src={bicycle5}
                  style={{ height: '100%', width: '100%', borderRadius: '4px', objectFit: 'cover', cursor: 'pointer' }}
                />
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link to={CART_ROUTE}>
                <img
                  alt="spare_parts"
                  src={spare_parts}
                  style={{ height: '100%', width: '100%', borderRadius: '4px', objectFit: 'cover', cursor: 'pointer' }}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CardMammagamma;

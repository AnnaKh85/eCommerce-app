import bicycle5 from '@assets/normal_images/bicycle5.jpg';
import bicycle115 from '@assets/small_images/bicycle115.jpg';
import { Box, Container, Grid } from '@mui/material';

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
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={6} alignItems={'center'} justifyContent={'center'}>
            <img
              alt="bicycle115"
              src={bicycle115}
              style={{ height: '100%', maxWidth: '100%', objectFit: 'cover', borderRadius: '4px' }}
            />
          </Grid>
          <Grid item xs={6} alignItems={'center'}>
            <img alt="bicycle5" src={bicycle5} style={{ height: '50%', maxWidth: '100%', borderRadius: '4px' }} />
            <img alt="bicycle12" src={bicycle115} style={{ maxHeight: '50%', maxWidth: '100%', borderRadius: '4px' }} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CardMammagamma;

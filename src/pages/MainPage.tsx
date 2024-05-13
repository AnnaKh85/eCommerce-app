import bicycle12 from '@assets/small_images/bicycle12.jpg';
import { Box, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import CardCollection from '../components/card/CardCollection.tsx';
import CardWhyUs from '../components/card/CardWhyUs.tsx';
import { ABOUT_US } from '../services/constants.ts';

const styles = {
  banner: {
    backgroundSize: 'cover',
    padding: '50px 0',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    gap: '20px',
  },
  image: {
    maxWidth: '400px',
  },
};

function MainPage() {
  return (
    <>
      {/*<h2>MainPage</h2>*/}
      {/*<Card />*/}
      <Container style={styles.banner}>
        <Typography variant="h3" gutterBottom>
          Welcome to Mammagamma – Your Ultimate Destination for Biking Enthusiasts!
        </Typography>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'left',
            gap: '20px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'left',
              gap: '20px',
              margin: '0 auto',
              padding: '20px',
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Whether you’re a seasoned rider or just starting your biking journey, we’ve got something for everyone.
              Explore our wide range of bicycles, gear up with top-quality accessories, and experience the thrill of the
              open road.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to={ABOUT_US}>
              About Us
            </Button>
          </Box>
          <Box>
            <img style={styles.image} alt="bicycle12" src={bicycle12} />
          </Box>
        </Container>
      </Container>
      <CardWhyUs />
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
        <Typography variant="h4" gutterBottom>
          Explore Our Collection
        </Typography>
        <CardCollection />
      </Container>

      <Container
        sx={{
          display: 'flex',
          margin: '0 auto',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          backgroundColor: '#ebe8f4',
          borderRadius: '8px',
          marginTop: '20px',
          padding: '20px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to ride? Browse our online store or visit our physical location. Mammagamma – Where Adventure Begins!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Remember, life is like riding a bicycle – to keep your balance, you must keep moving!
        </Typography>
      </Container>
    </>
  );
}

export default MainPage;

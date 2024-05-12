import bicycle12 from '@assets/small_images/bicycle12.jpg';
import bicycle18 from '@assets/small_images/bicycle18.jpg';
import bicycle111 from '@assets/small_images/bicycle111.jpg';
import bicycle112 from '@assets/small_images/bicycle112.jpg';
import bicycle115 from '@assets/small_images/bicycle115.jpg';
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import CardCollection from '../components/card/CardCollection.tsx';
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
          Why Choose Mammagamma?
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <CardContent>
                <Card variant="outlined" style={{ border: '0' }}>
                  <CardMedia sx={{ height: 140, backgroundSize: 'cover' }} image={bicycle115} title="bicycle2" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Quality Bikes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Discover a curated collection of high-performance bikes – from sleek road bikes to rugged mountain
                      bikes. Our expert team ensures that every bike meets the highest standards.
                    </Typography>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <Card variant="outlined" style={{ border: '0' }}>
                  <CardMedia sx={{ height: 140, backgroundSize: 'cover' }} image={bicycle111} title="bicycle2" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Service and Repairs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Our in-house mechanics provide top-notch service and repairs. Keep your bike in tip-top shape with
                      our maintenance packages.
                    </Typography>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>

            <Grid item xs={6}>
              <CardContent>
                <Card variant="outlined" style={{ border: '0' }}>
                  <CardMedia sx={{ height: 140, backgroundSize: 'cover' }} image={bicycle112} title="bicycle2" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Community Hub
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Join our cycling community! Attend group rides, workshops, and events. Share your biking stories
                      and connect with fellow enthusiasts.
                    </Typography>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <Card variant="outlined" style={{ border: '0' }}>
                  <CardMedia sx={{ height: 140, backgroundSize: 'cover' }} image={bicycle18} title="bicycle2" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Expert Advice
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Need guidance? Our knowledgeable staff is here to assist you in choosing the perfect bike based on
                      your preferences, riding style, and terrain.
                    </Typography>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          </Grid>
        </Box>
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

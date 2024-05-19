import bicycle18 from '@assets/small_images/bicycle18.jpg';
import bicycle111 from '@assets/small_images/bicycle111.jpg';
import bicycle112 from '@assets/small_images/bicycle112.jpg';
import bicycle115 from '@assets/small_images/bicycle115.jpg';
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';

function CardWhyUs() {
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
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2.25rem' } }}>
        Why Choose Mammagamma?
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <CardContent>
              <Card variant="outlined" style={{ border: '0' }}>
                <CardMedia sx={{ height: 140, backgroundSize: 'cover' }} image={bicycle115} title="bicycle2" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: { xs: '1.1rem', sm: '2rem' } }}>
                    Quality Bikes
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
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
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: { xs: '1.1rem', sm: '2rem' } }}>
                    Service and Repairs
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
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
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: { xs: '1.1rem', sm: '2rem' } }}>
                    Community Hub
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                    Join our cycling community! Attend group rides, workshops, and events. Share your biking stories and
                    connect with fellow enthusiasts.
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
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: { xs: '1.1rem', sm: '2rem' } }}>
                    Expert Advice
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
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
  );
}

export default CardWhyUs;

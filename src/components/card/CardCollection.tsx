import bicycle4 from '@assets/normal_images/bicycle4.jpg';
import bicycle9 from '@assets/normal_images/bicycle9.jpg';
import bicycle14 from '@assets/small_images/bicycle14.jpg';
import bicycle19 from '@assets/small_images/bicycle19.jpg';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export default function CardCollection() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <CardContent>
            <Card variant="outlined" style={{ border: '0' }}>
              <CardMedia sx={{ height: 220, backgroundSize: 'cover' }} image={bicycle19} title="bicycle2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Road Bikes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Speed demons, this one’s for you! Lightweight frames, aerodynamic designs, and precision engineering
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Typography sx={{ fontSize: '12px' }}>Start price from:</Typography>
                    <Typography sx={{ fontSize: '22px', fontWeight: '700' }}>$2,900</Typography>
                  </div>
                  <Button variant="contained">Explore</Button>
                </Box>
              </CardContent>
            </Card>
          </CardContent>
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            <Card variant="outlined" style={{ border: '0' }}>
              <CardMedia sx={{ height: 220, backgroundSize: 'cover' }} image={bicycle9} title="bicycle2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Mountain Bikes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Conquer trails and rugged terrain. Explore the great outdoors with our durable mountain bikes
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Typography sx={{ fontSize: '12px' }}>Start price from:</Typography>
                    <Typography sx={{ fontSize: '22px', fontWeight: '700' }}>$2,900</Typography>
                  </div>
                  <Button variant="contained">Explore</Button>
                </Box>
              </CardContent>
            </Card>
          </CardContent>
        </Grid>

        <Grid item xs={6}>
          <CardContent>
            <Card variant="outlined" style={{ border: '0' }}>
              <CardMedia sx={{ height: 220, backgroundSize: 'cover' }} image={bicycle4} title="bicycle2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  City Cruisers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stylish, comfortable, and perfect for urban commuting. Cruise through the streets in style
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Typography sx={{ fontSize: '12px' }}>Start price from:</Typography>
                    <Typography sx={{ fontSize: '22px', fontWeight: '700' }}>$2,900</Typography>
                  </div>
                  <Button variant="contained">Explore</Button>
                </Box>
              </CardContent>
            </Card>
          </CardContent>
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            <Card variant="outlined" style={{ border: '0' }}>
              <CardMedia sx={{ height: 220, backgroundSize: 'cover' }} image={bicycle14} title="bicycle2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Kids’ Bikes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start them young! Check out our range of safe and fun bikes for the little riders
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Typography sx={{ fontSize: '12px' }}>Start price from:</Typography>
                    <Typography sx={{ fontSize: '22px', fontWeight: '700' }}>$2,900</Typography>
                  </div>
                  <Button variant="contained">Explore</Button>
                </Box>
              </CardContent>
            </Card>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
}

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import type { IProduct } from '../../services/interfaces.ts';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: '10px 0',
        height: '470px',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.name['en-GB']}
          height="140"
          image={product.masterVariant.images[0].url}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="text.primary">
            {product.name['en-GB']}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              textAlign: { xs: 'center', sm: 'left' },
              height: '150px',
            }}
          >
            {product.description['en-GB']}
          </Typography>
          <Typography
            color="text.primary"
            sx={{ fontSize: { xs: '0.8rem', sm: '1rem', fontWeight: '700', margin: '8px' } }}
          >
            Price: {product.masterVariant.prices[0].value.centAmount / 100}{' '}
            {product.masterVariant.prices[0].value.currencyCode}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Button size="small" variant={'outlined'}>
            Details
          </Button>
          <Button size="small" variant={'outlined'}>
            <AddShoppingCartIcon />
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;

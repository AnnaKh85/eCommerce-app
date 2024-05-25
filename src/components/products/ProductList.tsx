import { Box, CircularProgress } from '@mui/material';

import type { IProduct } from '../../services/interfaces.ts';
import ProductCard from './ProductCard.tsx';
import { useProducts } from './useProducts.ts';

interface ProductListProps {
  selectedCategory: string | null;
  selectedPriceRange: string | null;
  selectedCountry: string | null;
  sort: string | null;
}

export default function ProductList({ selectedCategory, selectedPriceRange, selectedCountry, sort }: ProductListProps) {
  const { isLoading, products, error } = useProducts(
    selectedCategory || '',
    selectedPriceRange || '',
    selectedCountry || '',
    sort || '',
  );

  if (isLoading) return <CircularProgress />;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'left',
        alignItems: 'flex-start',
        overflow: 'hidden',
        gap: '10px',
        p: 2,
        width: '100%',
      }}
    >
      {products &&
        products.results.map((product: IProduct) => {
          return <ProductCard product={product} key={product.id} />;
        })}
    </Box>
  );
}

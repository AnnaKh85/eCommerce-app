import { Box, CircularProgress } from '@mui/material';

import type { IProduct } from '../../services/interfaces.ts';
import { useSearch } from '../search/useSearch.ts';
import ProductCard from './ProductCard.tsx';
import { useProducts } from './useProducts.ts';

interface ProductListProps {
  selectedCategory: string | null;
  selectedPriceRange: string | null;
  selectedCountry: string | null;
  sort: string | null;
  queryString: string | null;
}

export default function ProductList({
  selectedCategory,
  selectedPriceRange,
  selectedCountry,
  sort,
  queryString,
}: ProductListProps) {
  const { isLoading, products, error } = useProducts(
    selectedCategory || '',
    selectedPriceRange || '',
    selectedCountry || '',
    sort || '',
  );

  const { searchResult } = useSearch(queryString || '');

  if (isLoading) return <CircularProgress />;
  if (error) return <div>An error occurred: {error.message}</div>;

  const displayProducts = queryString ? searchResult?.results : products?.results;

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
      {displayProducts &&
        displayProducts.map((product: IProduct) => {
          return <ProductCard product={product} key={product.id} />;
        })}
    </Box>
  );
}

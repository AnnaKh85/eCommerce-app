// ProductList.tsx
import { Box, Button, CircularProgress } from '@mui/material';

import type { IProduct } from '../../services/interfaces.ts';
import { useSearch } from '../search/useSearch.ts';
import ProductCard from './ProductCard.tsx';
import { useProducts } from './useProducts.ts';

interface ProductListProps {
  selectedCategory: string | null;
  selectedPriceRange: string | null;
  selectedCountry: string | null;
  selectedMaterial: string | null;
  sort: string | null;
  queryString: string | null;
}

export default function ProductList({
  selectedCategory,
  selectedPriceRange,
  selectedCountry,
  selectedMaterial,
  sort,
  queryString,
}: ProductListProps) {
  const { isLoading, products, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts(
    selectedCategory || '',
    selectedPriceRange || '',
    selectedCountry || '',
    selectedMaterial || '',
    sort || '',
  );

  const { searchResult } = useSearch(queryString || '');

  if (isLoading) return <CircularProgress />;
  if (error) return <div>An error occurred: {error.message}</div>;

  const displayProducts = queryString ? searchResult?.results : products;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: {
          xs: 'center',
          sm: 'left',
        },
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
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </Button>
        )}
      </Box>
    </Box>
  );
}

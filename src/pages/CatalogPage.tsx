import { Box } from '@mui/material';
import { useState } from 'react';

import CategoryList from '../components/caterories/CategoryList.tsx';
import ColorOptions from '../components/caterories/ColorOptions.tsx';
import PriceOptions from '../components/caterories/PriceOptions.tsx';
import ProductList from '../components/products/ProductList.tsx';

function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <>
      <h2>Catalog page</h2>
      <Box
        sx={{
          display: 'flex',
          margin: '0 auto',
          flexDirection: 'row',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            gap: '20px',
            flexWrap: 'noWrap',
          }}
        >
          <CategoryList setSelectedCategory={setSelectedCategory} />
          <PriceOptions />
          <ColorOptions />
        </Box>

        <ProductList selectedCategory={selectedCategory} />
      </Box>
    </>
  );
}

export default CatalogPage;

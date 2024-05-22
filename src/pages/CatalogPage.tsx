import { Box } from '@mui/material';

import CategoryList from '../components/caterories/CategoryList.tsx';
import ProductList from '../components/products/ProductList.tsx';

function CatalogPage() {
  return (
    <>
      <h2>Catalog page</h2>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          margin: '0 auto',
          flexDirection: 'row',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <CategoryList />
        <ProductList />
      </Box>
    </>
  );
}

export default CatalogPage;

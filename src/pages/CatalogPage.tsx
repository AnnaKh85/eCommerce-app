import { Box, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

import CategoryList from '../components/caterories/CategoryList.tsx';
import ColorOptions from '../components/caterories/ColorOptions.tsx';
import PriceOptions from '../components/caterories/PriceOptions.tsx';
import { useCategories } from '../components/caterories/useCategories.ts';
import ProductList from '../components/products/ProductList.tsx';
import type { ICategory } from '../services/interfaces.ts';

function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const { categories } = useCategories();

  useEffect(() => {
    if (selectedCategory && categories) {
      const category = categories.results.find((c: ICategory) => c.id === selectedCategory);
      setSelectedCategoryName(category ? category.name['en-GB'] : null);
    }
  }, [selectedCategory, categories]);

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
    setSelectedCategory(null);
    setSelectedCategoryName(null);
  };

  return (
    <>
      <h2>Catalog page</h2>
      <Box
        sx={{
          display: 'flex',
          margin: '0 auto',
          flexDirection: 'row',
          gap: '20px',
          flexWrap: 'noWrap',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            gap: '20px',
            flexWrap: 'noWrap',
            width: '30%',
            // maxWidth: '250px',
          }}
        >
          <CategoryList setSelectedCategory={setSelectedCategory} />
          <PriceOptions />
          <ColorOptions />
        </Box>

        <Box
          sx={{
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              margin: '0 auto',
              flexDirection: 'row',
              justifyContent: 'left',
              alignItems: 'center',
              gap: '20px',
              width: '100%',
            }}
          >
            <Typography variant="h6">Applied filters: </Typography>
            <Stack direction="row" spacing={1}>
              {selectedCategoryName && <Chip label={selectedCategoryName} variant="outlined" onDelete={handleDelete} />}
            </Stack>
          </Box>
          <ProductList selectedCategory={selectedCategory} />
        </Box>
      </Box>
    </>
  );
}

export default CatalogPage;

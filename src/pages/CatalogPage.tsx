import { Box, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

import CategoryList from '../components/caterories/CategoryList.tsx';
import { useCategories } from '../components/caterories/useCategories.ts';
import CountryOptions from '../components/filters/CountryOptions.tsx';
import PriceOptions from '../components/filters/PriceOptions.tsx';
import ProductList from '../components/products/ProductList.tsx';
import SortByName from '../components/sortOptions/SortByName.tsx';
import SortByPrice from '../components/sortOptions/SortByPrice.tsx';
import type { ICategory } from '../services/interfaces.ts';

function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>('');
  const { categories } = useCategories();

  useEffect(() => {
    if (selectedCategory && categories) {
      const category = categories.results.find((c: ICategory) => c.id === selectedCategory);
      setSelectedCategoryName(category ? category.name['en-GB'] : null);
    }
  }, [selectedCategory, categories]);

  const handleDeleteCategory = () => {
    console.info('You clicked the delete icon.');
    setSelectedCategory(null);
    setSelectedCategoryName(null);
  };

  const handleDeletePriceRange = () => {
    console.info('You clicked the delete icon.');
    setSelectedPriceRange(null);
  };

  const handleDeleteCountry = () => {
    console.info('You clicked the delete icon.');
    setSelectedCountry(null);
  };

  const handleSortNameChange = (newSort: string) => {
    setSort(newSort);
  };
  const handleSortPriceChange = (newSort: string) => {
    setSort(newSort);
  };

  // const handleSortCreatedAtChange = (newSort: string) => {
  //     setSort(newSort);
  // };

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
            flexWrap: 'noWrap',
            width: '30%',
            // maxWidth: '250px',
          }}
        >
          <CategoryList setSelectedCategory={setSelectedCategory} />
          <PriceOptions setSelectedPriceRange={setSelectedPriceRange} />
          <CountryOptions setSelectedCountry={setSelectedCountry} />
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
              {selectedCategoryName && (
                <Chip label={selectedCategoryName} variant="outlined" onDelete={handleDeleteCategory} />
              )}
              {selectedPriceRange && (
                <Chip label={`Price: ${selectedPriceRange}`} variant="outlined" onDelete={handleDeletePriceRange} />
              )}
              {selectedCountry && (
                <Chip
                  label={`Country: ${selectedCountry === '1' ? 'Russia' : selectedCountry === '2' ? 'Germany' : selectedCountry === '3' ? 'China' : ''}`}
                  variant="outlined"
                  onDelete={handleDeleteCountry}
                />
              )}
            </Stack>
          </Box>
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
            <SortByName setSort={handleSortNameChange} />
            <SortByPrice setSort={handleSortPriceChange} />
            {/*<SortByCreatedAt setSort={handleSortCreatedAtChange} />*/}
          </Box>
          <ProductList
            selectedCategory={selectedCategory}
            selectedPriceRange={selectedPriceRange}
            selectedCountry={selectedCountry}
            sort={sort}
          />
        </Box>
      </Box>
    </>
  );
}

export default CatalogPage;

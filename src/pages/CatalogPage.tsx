import { Box, Chip, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import CategoryBreadcrumbs from '../components/caterories/CategoryBreadcrumbs.tsx';
import CategoryList from '../components/caterories/CategoryList.tsx';
// import { useCategories } from '../components/caterories/useCategories.ts';
import CountryOptions from '../components/filters/CountryOptions.tsx';
import MaterialOptions from '../components/filters/MaterialOptions.tsx';
import PriceOptions from '../components/filters/PriceOptions.tsx';
import ProductList from '../components/products/ProductList.tsx';
import SearchField from '../components/search/Search.tsx';
import SortByName from '../components/sortOptions/SortByName.tsx';
import SortByPrice from '../components/sortOptions/SortByPrice.tsx';

function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>('');
  const [queryString, setQueryString] = useState<string | null>(null);
  // const { categories } = useCategories();

  const handleDeletePriceRange = () => {
    setSelectedPriceRange(null);
  };

  const handleDeleteCountry = () => {
    setSelectedCountry(null);
  };

  const handleDeleteMaterial = () => {
    setSelectedMaterial(null);
  };

  const handleSortNameChange = (newSort: string) => {
    setSort(newSort);
  };
  const handleSortPriceChange = (newSort: string) => {
    setSort(newSort);
  };

  const handleSetSelectedCategory = (category: string | null) => {
    if (queryString) setQueryString(null);
    setSelectedCategory(category);
  };

  const handleSetSelectedPriceRange = (priceRange: string | null) => {
    if (queryString) setQueryString(null);
    setSelectedPriceRange(priceRange);
  };

  const handleSetSelectedCountry = (country: string | null) => {
    if (queryString) setQueryString(null);
    setSelectedCountry(country);
  };

  const handleSetSelectedMaterial = (material: string | null) => {
    if (queryString) setQueryString(null);
    setSelectedMaterial(material);
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
            flexWrap: 'noWrap',
            width: '25%',
          }}
        >
          <SearchField setQueryString={setQueryString} />
          <CategoryList setSelectedCategory={handleSetSelectedCategory} />
          <PriceOptions setSelectedPriceRange={handleSetSelectedPriceRange} />
          <CountryOptions setSelectedCountry={handleSetSelectedCountry} />
          <MaterialOptions setSelectedMaterial={handleSetSelectedMaterial} />
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
          <CategoryBreadcrumbs selectedCategory={selectedCategory} setSelectedCategory={handleSetSelectedCategory} />
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
              {selectedPriceRange && (
                <Chip label={`Price: ${selectedPriceRange}`} variant="outlined" onDelete={handleDeletePriceRange} />
              )}
              {selectedCountry && (
                <Chip
                  label={`Country: ${
                    selectedCountry === '1'
                      ? 'Russia'
                      : selectedCountry === '2'
                        ? 'Germany'
                        : selectedCountry === '3'
                          ? 'China'
                          : ''
                  }`}
                  variant="outlined"
                  onDelete={handleDeleteCountry}
                />
              )}
              {selectedMaterial && (
                <Chip
                  label={`Material: ${
                    selectedMaterial === '1'
                      ? 'Plastic'
                      : selectedMaterial === '2'
                        ? 'Steel'
                        : selectedMaterial === '3'
                          ? 'Aluminium'
                          : selectedMaterial === '4'
                            ? 'Carbon'
                            : selectedMaterial === '5'
                              ? 'Textile'
                              : ''
                  }`}
                  variant="outlined"
                  onDelete={handleDeleteMaterial}
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
            selectedMaterial={selectedMaterial}
            sort={sort}
            queryString={queryString}
          />
        </Box>
      </Box>
    </>
  );
}

export default CatalogPage;

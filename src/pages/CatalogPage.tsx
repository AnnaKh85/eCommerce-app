import { Box, Chip, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

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
import { createCart as createCartApi } from '../services/api/customerCart.ts';
import type { ICart } from '../services/interfaces.ts';

function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>('');
  const [queryString, setQueryString] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate: createCart } = useMutation({
    mutationFn: createCartApi,
    onSuccess: (data: ICart) => {
      sessionStorage.setItem('cartId', data.id);
      queryClient.setQueryData(['activeCart'], data);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  useEffect(() => {
    const cartId = sessionStorage.getItem('cartId');
    if (!cartId) {
      createCart();
    } else {
      queryClient.setQueryData(['activeCart'], { id: cartId });
    }
  }, [createCart, queryClient]);

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
          flexDirection: {
            sx: 'column',
            sm: 'row',
          },
          gap: '20px',
          flexWrap: {
            xs: 'wrap',
            sm: 'noWrap',
          },
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            flexWrap: 'noWrap',
            width: {
              xs: '100%',
              sm: '25%',
            },
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
            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.2rem',
                },
                fontWeight: {
                  xs: '700',
                  sm: '700',
                },
              }}
            >
              Applied filters:{' '}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
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
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
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

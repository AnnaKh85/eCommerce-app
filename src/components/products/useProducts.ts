import { useQuery } from '@tanstack/react-query';

import { getFilteredProducts } from '../../services/api/product.ts';

export function useProducts(
  selectedCategory: string,
  priceRange: string | null,
  country: string | null,
  material: string | null,
  sort: string | null = '',
) {
  let priceFrom = '';
  let priceTo = '';

  if (priceRange) {
    const [from, to] = priceRange.split('-');
    priceFrom = from;
    priceTo = to === '+' ? '*' : to;
  }

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ['products', selectedCategory, priceFrom, priceTo, country, material, sort],
    queryFn: () =>
      getFilteredProducts(
        selectedCategory || '',
        priceFrom || '',
        priceTo || '',
        country || '',
        material || '',
        sort || '',
        0,
      ),
  });

  return { isLoading, error, products };
}

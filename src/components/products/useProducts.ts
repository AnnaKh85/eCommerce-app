import { useInfiniteQuery } from '@tanstack/react-query';

import { getFilteredProducts } from '../../services/api/product.ts';
import type { IProduct } from '../../services/interfaces.ts';

interface ProductPage {
  results: IProduct[];
}

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

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<ProductPage, Error>({
    queryKey: ['products', selectedCategory, priceFrom, priceTo, country, material, sort],
    queryFn: ({ pageParam = 0 }) =>
      getFilteredProducts(
        selectedCategory || '',
        priceFrom || '',
        priceTo || '',
        country || '',
        material || '',
        sort || '',
        pageParam as number,
        6,
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.results?.length === 6) {
        return pages.length * 6;
      } else {
        return undefined;
      }
    },
    initialPageParam: 0,
  });

  return {
    isLoading: status === 'pending',
    error,
    products: data?.pages.flatMap((page) => page.results) || [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

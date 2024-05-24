import { useQuery } from '@tanstack/react-query';

import { getFilteredProducts } from '../../services/api/product.ts';

export function useProducts(selectedCategory: string) {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => getFilteredProducts(selectedCategory || '', '', '', '', 0),
  });

  return { isLoading, error, products };
}

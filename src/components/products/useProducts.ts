import { useQuery } from '@tanstack/react-query';

import { getFilteredProducts } from '../../services/api/product.ts';

export function useProducts() {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => getFilteredProducts('', '', 0),
  });

  return { isLoading, error, products };
}

import { useQuery } from '@tanstack/react-query';

import { getFilteredProducts } from '../../services/api/product.ts';

export function useProducts() {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => getFilteredProducts('8159c386-d6d2-46b3-abea-9ef140b3e0f5', '', 0),
  });

  return { isLoading, error, products };
}

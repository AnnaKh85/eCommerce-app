import { useQuery } from '@tanstack/react-query';

import { getProductById } from '../../services/api/product.ts';

export function useProduct(productId: string) {
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  });

  return { isLoading, error, product };
}

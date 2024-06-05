import { useQuery } from '@tanstack/react-query';

import getCartQuery from '../../services/api/customerCart.ts';

export function useCart() {
  const {
    isLoading,
    data: cart,
    error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartQuery(),
    staleTime: 0,
  });

  return { isLoading, error, cart };
}

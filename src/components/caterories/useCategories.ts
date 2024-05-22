import { useQuery } from '@tanstack/react-query';

import getCategoriesQuery from '../../services/api/getCategories.ts';

export function useCategories() {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesQuery,
  });

  return { isLoading, error, categories };
}

import { useQuery } from '@tanstack/react-query';

import { getSearchProducts } from '../../services/api/getSearchProducts.ts';

export function useSearch(queryString: string) {
  const { data: searchResult } = useQuery({
    queryKey: ['search', queryString],
    queryFn: () => getSearchProducts(queryString),
    enabled: !!queryString,
  });

  return { searchResult };
}

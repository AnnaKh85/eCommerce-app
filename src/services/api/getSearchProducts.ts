import { BASE_URL, PRODUCT_KEY } from '../constants.ts';

export async function getSearchProducts(valueSearch: string) {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;

  const normalizedSearch = valueSearch.trim().toLowerCase();

  const response = await fetch(
    `${BASE_URL}/${PRODUCT_KEY}/product-projections/search?&limit=10&text.en-GB=${normalizedSearch}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
    },
  );
  return await response.json();
}

import { BASE_URL, PRODUCT_KEY } from '../constants.ts';

export async function getSearchProducts(valueSearch: string) {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;

  const response = await fetch(
    `${BASE_URL}/${PRODUCT_KEY}/product-projections/search?&limit=10&text.en-GB=${valueSearch}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
    },
  );
  return await response.json();
}

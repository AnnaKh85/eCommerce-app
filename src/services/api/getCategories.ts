import { BASE_URL, PRODUCT_KEY } from '../constants.ts';

export default async function getCategoriesQuery() {
  const anonymousToken: string = sessionStorage.getItem('anonymousToken') as string;

  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/categories`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${anonymousToken}`,
    },
  });
  return await response.json();
}

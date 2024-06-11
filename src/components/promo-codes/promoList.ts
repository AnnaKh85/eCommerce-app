import { BASE_URL, PRODUCT_KEY } from '../../services/constants';

export default async function getPromoList() {
  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/discount-codes`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      'Content-type': 'application/json',
    },
    method: 'GET',
  });
  const responseData = await response.json();

  return responseData;
}

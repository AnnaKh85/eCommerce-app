import { BASE_URL, PRODUCT_KEY } from '../constants.ts';

export default async function getAllCustomers() {
  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/customers`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

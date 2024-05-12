import { BASE_URL, PRODUCT_KEY } from '../constants.ts';
import type { CustomerDraft, CustomerSignInResult } from '../interfaces.ts';

const createCustomer = async (customer: CustomerDraft): Promise<CustomerSignInResult> => {
  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/customers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });
  const data = (await response.json()) as CustomerSignInResult;
  if (!response.ok) {
    throw new Error('Something went wrong');
  }
  return data;
};

export default createCustomer;

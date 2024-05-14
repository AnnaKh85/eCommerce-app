import { BASE_URL, PRODUCT_KEY } from '../constants.ts';
import type { CustomerDraft, CustomerSignInResult, ResponseError } from '../interfaces.ts';
import { ApiError } from './apiError.ts';

const createCustomer = async (customer: CustomerDraft): Promise<CustomerSignInResult> => {
  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/customers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new ApiError(data as ResponseError);
  }
  return data as CustomerSignInResult;
};

export default createCustomer;

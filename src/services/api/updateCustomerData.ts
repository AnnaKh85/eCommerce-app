import { BASE_URL, PRODUCT_KEY } from '../constants.ts';
import type { Customer, CustomerUpdate, ResponseError } from '../interfaces.ts';
import { ApiError } from './apiError.ts';

const updateCustomerData = async (id: string, customer: CustomerUpdate): Promise<Customer> => {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;

  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/customers/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new ApiError(data as ResponseError);
  }
  return data as Customer;
};

export default updateCustomerData;

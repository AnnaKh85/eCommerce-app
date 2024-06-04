import { BASE_URL, PRODUCT_KEY } from '../constants.ts';
import type { Customer, ResponseError } from '../interfaces.ts';
import { ApiError } from './apiError.ts';

const getCustomerInfo = async (id: string): Promise<Customer> => {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;

  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/customers/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new ApiError(data as ResponseError);
  }
  return data as Customer;
};

export default getCustomerInfo;

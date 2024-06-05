import { BASE_URL, PRODUCT_KEY } from '../constants';
import type { Customer, CustomerUpdate, ResponseError } from '../interfaces';
import { ApiError } from './apiError';

const deleteCustomerAddress = async (id: string, customerUpdate: CustomerUpdate): Promise<Customer> => {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;

  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/customers/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerUpdate),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new ApiError(data as ResponseError);
  }
  return data as Customer;
};

export default deleteCustomerAddress;

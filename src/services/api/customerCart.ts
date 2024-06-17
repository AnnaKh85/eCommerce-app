import { BASE_URL, PRODUCT_KEY } from '../constants.ts';
import type { ICart, ICartActions } from '../interfaces.ts';

export async function updateMyCart(id: string, version: number, actions: ICartActions[]): Promise<ICart> {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;
  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/me/carts/${id}`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + authorizationToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ version: version, actions: actions }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update the cart');
  }

  return await response.json();
}

export default async function getCartQuery(): Promise<ICart> {
  const anonymousToken: string = sessionStorage.getItem('anonymousToken') as string;
  const cartId: string = sessionStorage.getItem('cartId') as string;

  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/me/carts/${cartId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${anonymousToken}`,
    },
  });
  return await response.json();
}

export async function createCart(): Promise<ICart> {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;
  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/me/carts`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + authorizationToken,
    },
    body: JSON.stringify({
      currency: 'RUB',
      country: 'RU',
    }),
  });
  return await response.json();
}

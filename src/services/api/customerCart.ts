import { BASE_URL, PRODUCT_KEY } from '../constants.ts';
import type { ICart, ICartActions, ICartPages } from '../interfaces.ts';

export async function getAllCarts() {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;
  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/me/carts`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + authorizationToken,
    },
  });
  const carts: ICartPages = await response.json();
  return carts;
}

export async function getMyCart(id: string) {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;
  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/me/carts/${id}`, {
    headers: {
      Authorization: 'Bearer ' + authorizationToken,
    },
  });
  const cart: ICart = await response.json();
  return cart;
}

export async function getActiveCart() {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;
  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/me/active-cart`, {
    headers: {
      Authorization: 'Bearer ' + authorizationToken,
    },
  });

  const cart: ICart = await response.json();
  return cart;
}

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

export async function clearCartById(id: string, version: number): Promise<ICart> {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;
  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/me/carts/${id}?version=${version}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + authorizationToken,
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

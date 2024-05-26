import { BASE_URL, PRODUCT_KEY } from '../constants.ts';
import type { IProduct } from '../interfaces.ts';

export async function getProductById(id: string) {
  const authorizationToken: string = sessionStorage.getItem('anonymousToken')!;

  const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/product-projections/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  const data: IProduct = await response.json();
  return data;
}

export async function getFilteredProducts(
  currentCategoryId?: string | null,
  priceFrom?: string,
  priceTo?: string,
  countryKey?: string,
  materialKey?: string,
  sort?: string,
  offset?: number,
) {
  const authorizationToken = sessionStorage.getItem('anonymousToken');

  if (authorizationToken) {
    const params = new URLSearchParams();
    let priceFromFinal: string | number = Number(priceFrom) * 100;
    let priceToFinal: string | number = Number(priceTo) * 100;

    params.append('limit', '100');

    params.append('offset', `${offset}`);

    if (currentCategoryId) {
      params.append('filter', `categories.id:"${currentCategoryId}"`);
    }

    if (countryKey) {
      params.append('filter', `variants.attributes.country.key:"${countryKey}"`);
    }

    if (materialKey) {
      params.append('filter', `variants.attributes.material.key:"${materialKey}"`);
    }

    if (priceFrom || priceTo) {
      if (priceTo === '0' || priceTo === '') {
        priceToFinal = '*';
      }
      if (priceFrom === '') {
        priceFromFinal = '0';
      }
      params.append('filter', `variants.price.centAmount:range (${priceFromFinal} to ${priceToFinal})`);
    }

    if (sort) {
      params.append('sort', `${sort}`);
    }

    const url = `${BASE_URL}/${PRODUCT_KEY}/product-projections/search?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
  }
}

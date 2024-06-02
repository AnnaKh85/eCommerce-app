import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getFilteredProducts } from '../services/api/product.ts';

// Mocking sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

// Mocking fetch
global.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  window.sessionStorage.clear();
});

describe('getFilteredProducts', () => {
  it('calls fetch with the correct URL and headers', async () => {
    const mockToken = 'test_token';
    window.sessionStorage.setItem('anonymousToken', mockToken);

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await getFilteredProducts('category1', '10', '100', 'US', 'metal', 'price asc', 0);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/product-projections/search'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      }),
    );
  });

  it('throws an error if the fetch response is not ok', async () => {
    const mockToken = 'test_token';
    window.sessionStorage.setItem('anonymousToken', mockToken);

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    });

    await expect(getFilteredProducts('category1', '10', '100', 'US', 'metal', 'price asc', 0)).rejects.toThrow(
      'Error fetching data: Internal Server Error',
    );
  });
});

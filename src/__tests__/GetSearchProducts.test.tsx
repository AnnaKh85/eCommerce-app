import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getSearchProducts } from '../services/api/getSearchProducts.ts';

beforeEach(() => {
  vi.resetAllMocks();
  sessionStorage.setItem('anonymousToken', 'test_token');
  global.fetch = vi.fn();
});

describe('getSearchProducts', () => {
  it('should call fetch with the correct URL and headers', async () => {
    const mockResponse = { products: [] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    const valueSearch = 'test';
    await getSearchProducts(valueSearch);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/product-projections/search?&limit=10&text.en-GB=test'),
      expect.objectContaining({
        method: 'GET',
        headers: {
          Authorization: 'Bearer test_token',
        },
      }),
    );
  });

  it('should return the correct response data', async () => {
    const mockResponse = { products: [{ id: 1, name: 'Test Product' }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    const valueSearch = 'test';
    const result = await getSearchProducts(valueSearch);

    expect(result).toEqual(mockResponse);
  });

  it('should normalize the search value correctly', async () => {
    const mockResponse = { products: [] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    const valueSearch = '  TeSt  ';
    await getSearchProducts(valueSearch);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/product-projections/search?&limit=10&text.en-GB=test'),
      expect.any(Object),
    );
  });

  it('should handle an empty search value', async () => {
    const mockResponse = { products: [] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    const valueSearch = '';
    const result = await getSearchProducts(valueSearch);

    expect(result).toEqual(mockResponse);
  });

  it('should handle a search value with special characters', async () => {
    const mockResponse = { products: [] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    const valueSearch = 'test@123';
    await getSearchProducts(valueSearch);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/product-projections/search?&limit=10&text.en-GB=test@123'),
      expect.any(Object),
    );
  });
});

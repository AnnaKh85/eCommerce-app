import { beforeEach, describe, expect, it, vi } from 'vitest';

import getCategoriesQuery from '../services/api/getCategories.ts';
import { BASE_URL, PRODUCT_KEY } from '../services/constants.ts';

global.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  sessionStorage.setItem('anonymousToken', 'testToken');
});

describe('getCategoriesQuery - Network Error Handling', () => {
  it('should throw an error when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network Error'));

    await expect(getCategoriesQuery()).rejects.toThrow('Network Error');
  });

  it('should not return any data when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network Error'));

    try {
      await getCategoriesQuery();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe('Network Error');
      }
    }
  });

  it('should call fetch with the correct URL and headers', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network Error'));

    try {
      await getCategoriesQuery();
    } catch (error) {
      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/${PRODUCT_KEY}/categories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer testToken`,
        },
      });
    }
  });

  it('should handle missing anonymousToken gracefully', async () => {
    sessionStorage.removeItem('anonymousToken');
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network Error'));

    try {
      await getCategoriesQuery();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe('Network Error');
      }
    }
  });

  it('should handle non-Error objects thrown by fetch', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce('Some string error');

    try {
      await getCategoriesQuery();
    } catch (error) {
      expect(error).toBe('Some string error');
    }
  });
});

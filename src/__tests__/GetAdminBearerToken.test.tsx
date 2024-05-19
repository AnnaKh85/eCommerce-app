import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getAdminBearerToken } from '../utils/getAdminToken.ts';

// Setup fetch mock
beforeEach(() => {
  vi.resetAllMocks();
  global.fetch = vi.fn();
});

describe('getAdminBearerToken', () => {
  it('returns the correct access token when fetch request is successful', async () => {
    const mockAccessToken = 'test_access_token';
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ access_token: mockAccessToken }),
    });

    const token = await getAdminBearerToken();
    expect(token).toBe(mockAccessToken);
  });

  it('calls fetch with the correct URL and headers', async () => {
    const mockAccessToken = 'test_access_token';
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ access_token: mockAccessToken }),
    });

    await getAdminBearerToken();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/oauth/token'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }),
    );
  });

  it('encodes client ID and secret correctly in the Authorization header', async () => {
    const mockAccessToken = 'test_access_token';
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ access_token: mockAccessToken }),
    });

    await getAdminBearerToken();
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringMatching(/^Basic\s.+/),
        }),
      }),
    );
  });

  it('handles fetch request failure gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    const token = await getAdminBearerToken();
    expect(token).toBeUndefined();
  });

  it('parses the response correctly to extract the access token', async () => {
    const mockResponseData = { access_token: 'correct_token' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponseData),
    });

    const token = await getAdminBearerToken();
    expect(token).toBe(mockResponseData.access_token);
  });
});

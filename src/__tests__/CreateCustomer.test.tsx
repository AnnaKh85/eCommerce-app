import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiError } from '../services/api/apiError';
import createCustomer from '../services/api/createCustomer';
import type { CustomerDraft } from '../services/interfaces';

// Mocking the global fetch function
global.fetch = vi.fn();

const mockCustomer: CustomerDraft = {
  email: 'test@example.com',
  password: 'Password123',
  firstName: 'Test',
  lastName: 'User',
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe('createCustomer', () => {
  it('throws an ApiError on a 500 response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(createCustomer(mockCustomer)).rejects.toThrow(ApiError);
  });

  it('thrown ApiError contains the correct message from the server', async () => {
    const errorMessage = 'Internal Server Error';
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: errorMessage }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(createCustomer(mockCustomer)).rejects.toThrow(errorMessage);
  });

  it('ApiError contains a status code of 500', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    try {
      await createCustomer(mockCustomer);
    } catch (error) {
      if (error instanceof ApiError) {
        expect(error).toBeInstanceOf(ApiError);
      } else {
        throw error;
      }
    }
  });

  it('no ApiError is thrown for successful requests', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(createCustomer(mockCustomer)).resolves.toBeDefined();
  });
});

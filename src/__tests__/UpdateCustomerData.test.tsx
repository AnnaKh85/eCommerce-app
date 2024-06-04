import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiError } from '../services/api/apiError.ts';
import updateCustomerData from '../services/api/updateCustomerData.ts';
import type { CustomerUpdate } from '../services/interfaces';

global.fetch = vi.fn();

const mockCustomerUpdate: CustomerUpdate = {
  version: 1,
  actions: [
    {
      action: 'changeEmail',
    },
  ],
};

const mockErrorResponse = {
  statusCode: 400,
  message: 'Bad Request',
  errors: [{ code: 'InvalidData', message: 'Invalid customer data' }],
};

beforeEach(() => {
  vi.resetAllMocks();
  sessionStorage.setItem('anonymousToken', 'mockToken');
});

describe('updateCustomerData', () => {
  it('throws an ApiError on a 400 response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockErrorResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(updateCustomerData('123', mockCustomerUpdate)).rejects.toThrow(ApiError);
  });

  it('thrown ApiError contains the correct message from the server', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockErrorResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(updateCustomerData('123', mockCustomerUpdate)).rejects.toThrow(mockErrorResponse.message);
  });

  it('ApiError contains a status code of 400', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockErrorResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    try {
      await updateCustomerData('123', mockCustomerUpdate);
    } catch (error) {
      if (error instanceof ApiError) {
        expect(error.responseError.statusCode).toBe(400);
      } else {
        throw error;
      }
    }
  });

  it('ApiError contains the correct error code and message', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockErrorResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    try {
      await updateCustomerData('123', mockCustomerUpdate);
    } catch (error) {
      if (error instanceof ApiError) {
        expect(error.responseError.errors[0].code).toBe('InvalidData');
        expect(error.responseError.errors[0].message).toBe('Invalid customer data');
      } else {
        throw error;
      }
    }
  });

  it('no ApiError is thrown for successful requests', async () => {
    const mockSuccessResponse = {
      email: 'updated@example.com',
      firstName: 'Updated',
      lastName: 'User',
    };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockSuccessResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(updateCustomerData('123', mockCustomerUpdate)).resolves.toEqual(mockSuccessResponse);
  });
});

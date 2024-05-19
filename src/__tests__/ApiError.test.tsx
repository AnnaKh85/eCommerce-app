import { describe, expect, it } from 'vitest';

import { ApiError } from '../services/api/apiError.ts';
import type { ResponseError } from '../services/interfaces.ts';

describe('ApiError', () => {
  const testErrorMessage = 'Test error message';
  const responseError: ResponseError = {
    statusCode: 400,
    message: testErrorMessage,
    errors: [{ code: 'ExampleErrorCode', message: 'Example error message' }],
  };

  it('should correctly set the error message', () => {
    const errorInstance = new ApiError(responseError);
    expect(errorInstance.message).toBe(testErrorMessage);
  });

  it('should have the name property set to "ApiError"', () => {
    const errorInstance = new ApiError(responseError);
    expect(errorInstance.name).toBe('ApiError');
  });

  it('should correctly assign the responseError object', () => {
    const errorInstance = new ApiError(responseError);
    expect(errorInstance.responseError).toBe(responseError);
  });

  it('responseError object should contain the message property', () => {
    const errorInstance = new ApiError(responseError);
    expect(errorInstance.responseError.message).toBe(testErrorMessage);
  });
});

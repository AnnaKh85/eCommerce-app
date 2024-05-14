import type { ResponseError } from '../interfaces';

export class ApiError extends Error {
  constructor(error: ResponseError) {
    super(error.message);
    this.name = 'ApiError';
    this.responseError = error;
  }
  public responseError: ResponseError;
}

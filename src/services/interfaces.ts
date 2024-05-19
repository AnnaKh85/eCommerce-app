export interface RouteError {
  data?: string;
  message?: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  key: string;
}

// Based on https://docs.commercetools.com/api/projects/customers#ctp:api:type:CustomerDraft
export interface CustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  addresses?: BaseAddress[];
  shippingAddresses?: number[];
  billingAddresses?: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

// Based on https://docs.commercetools.com/api/types#ctp:api:type:BaseAddress

export interface BaseAddress {
  country: string;
  streetName?: string;
  postalCode?: string;
  city?: string;
}

export interface CustomerSignInResult {
  customer: Customer;
}

export interface ResponseError {
  statusCode: number;
  message: string;
  errors: Error[];
}

export interface Error {
  code: string;
  message: string;
}

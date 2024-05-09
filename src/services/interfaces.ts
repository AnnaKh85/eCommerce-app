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

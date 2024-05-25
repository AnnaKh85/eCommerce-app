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

export interface ICategory {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: { isPlatformClient: boolean };
  createdBy: { isPlatformClient: boolean };
  key: string;
  name: ILocalizedString;
  slug: ILocalizedString;
  orderHint: string;
}

interface IReference {
  typeId: string;
  id: string;
}

interface ILocalizedString {
  [key: string]: string;
}

interface IPrice {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  discounted: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
  };
  country: string;
}

interface IImage {
  url: string;
  label: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface IAttribute {
  name: string;
  value: string | ILocalizedString;
}

interface IVariant {
  id: number;
  sku: string;
  key: string;
  prices: IPrice[];
  images: IImage[];
  attributes: IAttribute[];
}

export interface IProduct {
  id: string;
  version: number;
  productType: IReference;
  name: ILocalizedString;
  description: ILocalizedString;
  categories: IReference[];
  categoryOrderHints: Record<string, string>;
  slug: ILocalizedString;
  metaTitle: ILocalizedString;
  metaDescription: ILocalizedString;
  variants: IVariant[];
  masterVariant: IVariant;
  searchKeywords: Record<string, string>;
  hasStagedChanges: boolean;
  published: boolean;
  key: string;
  taxCategory: IReference;
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}

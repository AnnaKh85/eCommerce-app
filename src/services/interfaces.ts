export interface RouteError {
  data?: string;
  message?: string;
}

export interface Customer {
  version: number;
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: BaseAddress[];
  defaultShippingAddressId: string;
  shippingAddressIds: string[];
  defaultBillingAddressId: string;
  billingAddressIds: string[];
  isEmailVerified: boolean;
}

export interface CustomerUpdate {
  version: number;
  actions: CustomerUpdateAction[];
}

export type CustomerUpdateAction = {
  action: string;
};

export type SetFirstName = CustomerUpdateAction & {
  action: 'setFirstName';
  firstName: string;
};

export type SetLastName = CustomerUpdateAction & {
  action: 'setLastName';
  lastName: string;
};

export type SetDateOfBirth = CustomerUpdateAction & {
  action: 'setDateOfBirth';
  dateOfBirth: string;
};

export type ChangeEmail = CustomerUpdateAction & {
  action: 'changeEmail';
  email: string;
};

export interface CustomerPasswordChange {
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
}

export interface ChangedPassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type ChangeAddress = CustomerUpdateAction & {
  action: 'changeAddress';
  addressId: string;
  address: BaseAddressDraft;
};

export type AddAddress = CustomerUpdateAction & {
  action: 'addAddress';
  address: BaseAddressDraft;
};

export type AddShippingAddress = CustomerUpdateAction & {
  action: 'addShippingAddressId';
  addressId: string;
};

// Based on https://docs.commercetools.com/api/projects/customers#ctp:api:type:CustomerDraft
export interface CustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  addresses?: BaseAddressDraft[];
  shippingAddresses?: number[];
  billingAddresses?: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export type BaseAddressDraft = Omit<BaseAddress, 'id'>;
// Based on https://docs.commercetools.com/api/types#ctp:api:type:BaseAddress

export interface BaseAddress {
  country: string;
  streetName?: string;
  postalCode?: string;
  city?: string;
  id: string;
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
  lastModifiedBy?: { isPlatformClient: boolean };
  createdBy?: { isPlatformClient: boolean };
  key: string;
  name: ILocalizedString;
  slug: ILocalizedString;
  ancestors: IReference[];
  parent?: IReference;
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

export interface IImage {
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

// export interface CustomerUpdateAction {
//   action: string;
//   addressId?: string;
// }

export interface AddShippingAddressIdAction extends CustomerUpdateAction {
  action: 'addShippingAddressId';
  addressId: string;
}

export interface AddBillingAddressIdAction extends CustomerUpdateAction {
  action: 'addBillingAddressId';
  addressId: string;
}

export interface SetDefaultShippingAddressAction extends CustomerUpdateAction {
  action: 'setDefaultShippingAddress';
  addressId: string;
}

export interface SetDefaultBillingAddressAction extends CustomerUpdateAction {
  action: 'setDefaultBillingAddress';
  addressId: string;
}

export interface RemoveAddressAction extends CustomerUpdateAction {
  action: 'removeAddress';
  addressId: string;
}

export interface ICartActions {
  action: 'changeLineItemQuantity' | 'removeLineItem' | 'addDiscountCode' | 'addLineItem';
  lineItemId?: string;
  productId?: string;
  variantId?: number;
  quantity?: number;
}

export interface ICart {
  type: string;
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: false;
  };
  createdBy: {
    isPlatformClient: false;
  };
  lineItems: ILineItem[];
  cartState: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: string;
  shipping: [];
  customLineItems: [];
  discountCodes: DiscountCode[];
  directDiscounts: [];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  refusedGifts: [];
  origin: string;
  itemShippingAddresses: string[];
  statusCode?: string | number;
  message?: string;
}

export interface ILineItem {
  id: string;
  productId: string;
  productKey: string;
  name: ILocalizedString;
  productType: IReference;
  productSlug: ILocalizedString;
  variant: IVariant;
  price: IPrice;
  quantity: number;
  addedAt: string;
  lastModifiedAt: string;
  state: IState[];
  priceMode: string;
  lineItemMode: string;
  totalPrice: ITotalPrice;
}

export interface IState {
  quantity: number;
  state: IReference;
}

export interface ITotalPrice {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

interface DiscountCode {
  discountCode: { typeId: string; id: string };
  state: string;
}

export interface ICartPages {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ICart[];
  statusCode?: string | number;
  message?: string;
}

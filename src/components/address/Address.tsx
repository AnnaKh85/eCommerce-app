import type { BaseAddress, Customer } from '../../services/interfaces';

interface CustomerAddressProps {
  customer: Customer;
  shippingAddress: BaseAddress;
  billingAddress: BaseAddress;
}

const Address: React.FC<CustomerAddressProps> = ({ customer, shippingAddress, billingAddress }) => {
  return (
    <div>
      <h4>ShippingAddress</h4>
      <p>Country: {shippingAddress.country}</p>
      <p>City: {shippingAddress.city}</p>
      <p>Street: {shippingAddress.streetName}</p>
      <p>Postal code: {shippingAddress.postalCode}</p>
      {customer.defaultShippingAddressId && <p>Default shipping address</p>}

      <h4>BillingAddress</h4>
      <p>Country: {billingAddress.country}</p>
      <p>City: {billingAddress.city}</p>
      <p>Street: {billingAddress.streetName}</p>
      <p>Postal code: {billingAddress.postalCode}</p>
      {customer.defaultBillingAddressId && <p>Default shipping address</p>}
    </div>
  );
};

export default Address;

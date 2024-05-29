import './Address.css';

import type { BaseAddress, Customer } from '../../services/interfaces';

interface CustomerAddressProps {
  customer: Customer;
  shippingAddress: BaseAddress;
  billingAddress: BaseAddress;
}

const Address: React.FC<CustomerAddressProps> = ({ customer, shippingAddress, billingAddress }) => {
  return (
    <div className="address-container">
      <div className="address-box">
        <h4>ShippingAddress</h4>
        <p>Country: {shippingAddress.country}</p>
        <p>City: {shippingAddress.city}</p>
        <p>Street: {shippingAddress.streetName}</p>
        <p>Postal code: {shippingAddress.postalCode}</p>
        {customer.defaultShippingAddressId && <p className="address-default">Default shipping address</p>}
      </div>
      <div className="address-box">
        <h4>BillingAddress</h4>
        <p>Country: {billingAddress.country}</p>
        <p>City: {billingAddress.city}</p>
        <p>Street: {billingAddress.streetName}</p>
        <p>Postal code: {billingAddress.postalCode}</p>
        {customer.defaultBillingAddressId && <p className="address-default">Default shipping address</p>}
      </div>
    </div>
  );
};

export default Address;

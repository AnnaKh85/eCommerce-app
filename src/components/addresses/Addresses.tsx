import './Addresses.css';

import type { Customer } from '../../services/interfaces';
import Address from '../address/Address';

interface AddressesProps {
  customer: Customer;
  onCustomerUpdate: (customer: Customer) => void;
}

const Addresses: React.FC<AddressesProps> = ({ customer, onCustomerUpdate }) => {
  const shippingAddress = customer.addresses.find((address) => {
    return address.id === customer.shippingAddressIds[0];
  });
  const billingAddress = customer.addresses.find((address) => {
    return address.id === customer.billingAddressIds[0];
  });

  const handleAddressUpdate = (customer: Customer) => {
    onCustomerUpdate(customer);
  };

  if (shippingAddress && billingAddress) {
    return (
      <div className="addresses-block">
        <h2 className="addresses-block-title">Addresses</h2>
        <div className="address-box">
          <h3 className="address-box-title">Shipping Address</h3>
          <Address customer={customer} onAddressUpdate={handleAddressUpdate} address={shippingAddress} />
          {customer.defaultShippingAddressId && <div className="address-default">Default shipping address</div>}
        </div>
        <div className="address-box">
          <h3 className="address-box-title">Billing Address</h3>
          <Address customer={customer} onAddressUpdate={handleAddressUpdate} address={billingAddress} />
          {customer.defaultBillingAddressId && <div className="address-default">Default billing address</div>}
        </div>
      </div>
    );
  } else {
    return <div>Addresses not found</div>;
  }
};

export default Addresses;

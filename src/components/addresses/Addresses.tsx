import './Addresses.css';

import type { Customer } from '../../services/interfaces';
import Address from '../address/Address';

interface CustomerProps {
  customer: Customer;
}

const Addresses: React.FC<CustomerProps> = ({ customer }) => {
  const shippingAddress = customer.addresses.find((address) => {
    return address.id === customer.shippingAddressIds[0];
  });
  const billingAddress = customer.addresses.find((address) => {
    return address.id === customer.billingAddressIds[0];
  });

  if (shippingAddress && billingAddress) {
    return (
      <div className="addresses-block">
        <h3>Addresses</h3>
        <Address customer={customer} shippingAddress={shippingAddress} billingAddress={billingAddress} />
        <button className="address-btn">Edit</button>
      </div>
    );
  } else {
    return <div>Addresses not found</div>;
  }
};

export default Addresses;

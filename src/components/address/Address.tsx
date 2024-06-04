import { Button, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';

import changeCustomerAddress from '../../services/api/changeCustomerAddress';
import type { BaseAddress, ChangeAddress, Customer, CustomerUpdate } from '../../services/interfaces';
import ChangeAddressModal from '../change-address-modal/ChangeAddressModal';
import UpdateResponse from '../generalInfo/UpdateResponse';

interface CustomerAddressProps {
  customer: Customer;
  onAddressUpdate: (customer: Customer) => void;
  address: BaseAddress;
  shippingAddressIds: string[];
  billingAddressIds: string[];
}

const Address: React.FC<CustomerAddressProps> = ({
  customer,
  onAddressUpdate,
  address,
  shippingAddressIds,
  billingAddressIds,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [editAddressMode, setEditAddressMode] = useState(false);

  const handleAddressEditToggle = () => {
    setEditAddressMode(!editAddressMode);
  };

  const handleAddressSave = async (updatedAddress: BaseAddress) => {
    const customerId = localStorage.getItem('customerId');
    if (customerId !== null) {
      const requestBody: CustomerUpdate = {
        version: customer.version,
        actions: [
          {
            action: 'changeAddress',
            addressId: updatedAddress.id,
            address: {
              country: updatedAddress.country,
              streetName: updatedAddress.streetName,
              postalCode: updatedAddress.postalCode,
              city: updatedAddress.city,
            },
          } as ChangeAddress,
        ],
      };
      try {
        const updatedData = await changeCustomerAddress(customerId, requestBody);
        onAddressUpdate(updatedData);
        setEditAddressMode(false);
      } catch (error) {
        alert('Failed to save changes. Please try again.');
      }
    }
  };

  const getAddressType = (id: string) => {
    const types = [];
    if (shippingAddressIds.includes(id)) types.push('shipping');
    if (billingAddressIds.includes(id)) types.push('billing');
    return types.join(', ');
  };

  const isDefaultBilling = customer.defaultBillingAddressId === address.id;
  const isDefaultShipping = customer.defaultShippingAddressId === address.id;
  const rowStyle = {
    backgroundColor: isDefaultBilling ? 'lightgreen' : isDefaultShipping ? 'lightblue' : 'inherit',
  };

  return (
    <>
      <TableRow style={rowStyle}>
        <TableCell>{address.country}</TableCell>
        <TableCell>{address.postalCode}</TableCell>
        <TableCell>{address.city}</TableCell>
        <TableCell>{address.streetName}</TableCell>
        <TableCell>{getAddressType(address.id)}</TableCell>
        <TableCell>
          <Button onClick={handleAddressEditToggle} variant="contained" color="primary" size="small">
            Edit
          </Button>
        </TableCell>
      </TableRow>

      {editAddressMode && (
        <ChangeAddressModal
          address={address}
          onClose={handleAddressEditToggle}
          onSave={handleAddressSave}
          onRegistrationSuccess={() => setIsSuccess(true)}
        />
      )}

      <UpdateResponse onClose={() => setIsSuccess(false)} isOpen={isSuccess} />
    </>
  );
};

export default Address;

import type { SelectChangeEvent } from '@mui/material';
import { Button, MenuItem, Select, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';

import addCustomerAddressAction from '../../services/api/addCustomerAddressAction';
import changeCustomerAddress from '../../services/api/changeCustomerAddress';
import deleteCustomerAddress from '../../services/api/deleteCustomerAddress';
import setDefaultAddressAction from '../../services/api/setDefaultAddressAction'; // New function to handle setting default address
import type {
  BaseAddress,
  ChangeAddress,
  Customer,
  CustomerUpdate,
  CustomerUpdateAction,
} from '../../services/interfaces';
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
  const [addressType, setAddressType] = useState(() => {
    if (shippingAddressIds.includes(address.id)) return 'shipping';
    if (billingAddressIds.includes(address.id)) return 'billing';
    return '';
  });

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

  const handleAddressTypeChange = async (event: SelectChangeEvent<string>) => {
    const newType = event.target.value;
    const customerId = localStorage.getItem('customerId');
    if (customerId !== null) {
      const action: CustomerUpdateAction = {
        action: newType === 'shipping' ? 'addShippingAddressId' : 'addBillingAddressId',
        addressId: address.id,
      };

      const requestBody: CustomerUpdate = {
        version: customer.version,
        actions: [action],
      };
      try {
        const updatedData = await addCustomerAddressAction(customerId, requestBody);
        onAddressUpdate(updatedData);
        setAddressType(newType);
      } catch (error) {
        alert('Failed to update address type. Please try again.');
      }
    }
  };

  const handleDeleteAddress = async () => {
    const customerId = localStorage.getItem('customerId');
    if (customerId !== null) {
      const requestBody: CustomerUpdate = {
        version: customer.version,
        actions: [
          {
            action: 'removeAddress',
            addressId: address.id,
          },
        ],
      };
      try {
        const updatedData = await deleteCustomerAddress(customerId, requestBody);
        onAddressUpdate(updatedData);
      } catch (error) {
        alert('Failed to delete address. Please try again.');
      }
    }
  };

  const handleSetDefaultShipping = async () => {
    const customerId = localStorage.getItem('customerId');
    if (customerId !== null) {
      const requestBody: CustomerUpdate = {
        version: customer.version,
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId: address.id,
          },
        ],
      };
      try {
        const updatedData = await setDefaultAddressAction(customerId, requestBody);
        onAddressUpdate(updatedData);
      } catch (error) {
        alert('Failed to set default shipping address. Please try again.');
      }
    }
  };

  const handleSetDefaultBilling = async () => {
    const customerId = localStorage.getItem('customerId');
    if (customerId !== null) {
      const requestBody: CustomerUpdate = {
        version: customer.version,
        actions: [
          {
            action: 'setDefaultBillingAddress',
            addressId: address.id,
          },
        ],
      };
      try {
        const updatedData = await setDefaultAddressAction(customerId, requestBody);
        onAddressUpdate(updatedData);
      } catch (error) {
        alert('Failed to set default billing address. Please try again.');
      }
    }
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
        <TableCell>
          <Select value={addressType} onChange={handleAddressTypeChange}>
            <MenuItem value="shipping">Shipping</MenuItem>
            <MenuItem value="billing">Billing</MenuItem>
          </Select>
        </TableCell>
        <TableCell>
          <Button onClick={handleAddressEditToggle} variant="contained" color="primary" size="small">
            Edit
          </Button>
          <Button onClick={handleDeleteAddress} variant="contained" color="secondary" size="small">
            Delete
          </Button>
          <Button onClick={handleSetDefaultShipping} variant="contained" color="primary" size="small">
            Set default shipping
          </Button>
          <Button onClick={handleSetDefaultBilling} variant="contained" color="primary" size="small">
            Set default billing
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

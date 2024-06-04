import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import addCustomerAddress from '../../services/api/addCustomerAddress';
import getCustomerInfo from '../../services/api/getCustomerInfo';
import type { AddAddress, BaseAddressDraft, Customer, CustomerUpdate } from '../../services/interfaces';
import AddAddressModal from '../add-address-modal/AddAddressModal';
import Address from '../address/Address';

interface AddressesProps {
  customerId: string;
  onCustomerUpdate: (customer: Customer) => void;
}

const Addresses: React.FC<AddressesProps> = ({ customerId, onCustomerUpdate }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [addAddressMode, setAddAddressMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const customerData = await getCustomerInfo(customerId);
        setCustomer(customerData);
      } catch (error) {
        console.error('Failed to fetch customer info:', error);
      }
    };

    fetchCustomerInfo();
  }, [customerId]);

  const handleAddressUpdate = (updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
    onCustomerUpdate(updatedCustomer);
  };

  const handleAddressAddToggle = () => {
    setAddAddressMode(!addAddressMode);
  };

  const handleNewAddressSave = async (updatedAddress: BaseAddressDraft) => {
    const customerId = localStorage.getItem('customerId');
    if (customerId !== null && customer) {
      const requestBody: CustomerUpdate = {
        version: customer.version,
        actions: [
          {
            action: 'addAddress',
            address: {
              country: updatedAddress.country,
              streetName: updatedAddress.streetName,
              postalCode: updatedAddress.postalCode,
              city: updatedAddress.city,
            },
          } as AddAddress,
        ],
      };

      try {
        const updatedData = await addCustomerAddress(customerId, requestBody);
        handleAddressUpdate(updatedData);
        setAddAddressMode(false);
        setIsSuccess(true);
        console.debug(isSuccess);
      } catch (error) {
        alert('Failed to save changes. Please try again.');
      }
    }
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  const allAddresses = customer.addresses;

  return (
    <div className="addresses-block">
      <Typography variant="h4" className="addresses-block-title">
        Addresses
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Postal Code</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Street</TableCell>
              <TableCell>Address Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAddresses.map((address) => (
              <Address
                key={address.id}
                customer={customer}
                onAddressUpdate={handleAddressUpdate}
                address={address}
                shippingAddressIds={customer.shippingAddressIds}
                billingAddressIds={customer.billingAddressIds}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary" onClick={handleAddressAddToggle} style={{ marginTop: '20px' }}>
        Add Address
      </Button>

      {addAddressMode && (
        <AddAddressModal
          onClose={handleAddressAddToggle}
          onSave={handleNewAddressSave}
          onRegistrationSuccess={() => setIsSuccess(true)}
        />
      )}
    </div>
  );
};

export default Addresses;

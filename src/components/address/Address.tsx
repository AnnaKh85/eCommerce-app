import './Address.css';

import { useState } from 'react';

import addCustomerAddress from '../../services/api/addCustomerAddress';
import changeCustomerAddress from '../../services/api/changeCustomerAddress';
import type {
  AddAddress,
  BaseAddress,
  BaseAddressDraft,
  ChangeAddress,
  Customer,
  CustomerUpdate,
} from '../../services/interfaces';
import AddAddressModal from '../add-address-modal/AddAddressModal';
import ChangeAddressModal from '../change-address-modal/ChangeAddressModal';
import UpdateResponse from '../generalInfo/UpdateResponse';

interface CustomerAddressProps {
  customer: Customer;
  onAddressUpdate: (customer: Customer) => void;
  address: BaseAddress;
}

const Address: React.FC<CustomerAddressProps> = ({ customer, onAddressUpdate, address }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [editAddressMode, setEditAddressMode] = useState(false);
  const [addAddressMode, setAddAddressMode] = useState(false);

  const handleAddressEditToggle = () => {
    setEditAddressMode(!editAddressMode);
  };

  const handleAddressAddToggle = () => {
    setAddAddressMode(!addAddressMode);
  };

  const handleRegistrationSuccess = () => {
    setIsSuccess(true);
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
        alert('Failed to save changes.Please try again.');
      }
    }
  };

  const handleNewAddressSave = async (updatedAddress: BaseAddressDraft) => {
    const customerId = localStorage.getItem('customerId');
    if (customerId !== null) {
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
        // const newShippingAddressBody: CustomerUpdate = {
        //   version: updatedData.version,
        //   actions: [
        //     {
        //       action: 'addShippingAddressId',
        //       addressId: ,
        //     } as AddShippingAddress,
        //   ],
        // };
        // const newAddress = await addCustomerShippingAddress(customerId, newShippingAddressBody);
        onAddressUpdate(updatedData);
        setAddAddressMode(false);
      } catch (error) {
        alert('Failed to save changes. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="address-container">
        <table className="address-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Postal Code</th>
              <th>City</th>
              <th>Street</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{address.country}</td>
              <td>{address.postalCode}</td>
              <td>{address.city}</td>
              <td>{address.streetName}</td>
              <td>
                {!editAddressMode && (
                  <button className="address-container-edit-btn" onClick={handleAddressEditToggle}>
                    Edit
                  </button>
                )}
                {!addAddressMode && (
                  <button className="address-container-edit-btn" onClick={handleAddressAddToggle}>
                    Add
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {editAddressMode && (
          <ChangeAddressModal
            address={address}
            onClose={handleAddressEditToggle}
            onSave={handleAddressSave}
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        )}
        {addAddressMode && (
          <AddAddressModal
            onClose={handleAddressAddToggle}
            onSave={handleNewAddressSave}
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        )}
      </div>
      <UpdateResponse onClose={() => setIsSuccess(false)} isOpen={isSuccess} />
    </>
  );
};

export default Address;

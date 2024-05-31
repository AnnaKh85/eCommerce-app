import './GeneralInfo.css';

import React, { useState } from 'react';

import updateCustomerData from '../../services/api/updateCustomerData';
import type {
  ChangeEmail,
  Customer,
  CustomerUpdate,
  SetDateOfBirth,
  SetFirstName,
  SetLastName,
} from '../../services/interfaces';
import EditProfileModal from '../edit-profile-modal/EditProfileModal';
import UpdateResponse from './UpdateResponse';

interface GeneralInfoProps {
  customer: Customer;
  onCustomerUpdate: (customer: Customer) => void;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ customer, onCustomerUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleRegistrationSuccess = () => {
    setIsSuccess(true);
  };

  const handleSave = async (updatedCustomer: Customer) => {
    const customerId = localStorage.getItem('customerId');
    if (customerId !== null) {
      const requestBody: CustomerUpdate = {
        version: customer.version,
        actions: [
          {
            action: 'setFirstName',
            firstName: updatedCustomer.firstName,
          } as SetFirstName,
          {
            action: 'setLastName',
            lastName: updatedCustomer.lastName,
          } as SetLastName,
          {
            action: 'setDateOfBirth',
            dateOfBirth: updatedCustomer.dateOfBirth,
          } as SetDateOfBirth,
          {
            action: 'changeEmail',
            email: updatedCustomer.email,
          } as ChangeEmail,
        ],
      };
      try {
        const updatedData = await updateCustomerData(customerId, requestBody);
        onCustomerUpdate(updatedData);
        setEditMode(false);
      } catch (error) {
        console.error('Failed to save changes:', error);
      }
    }
  };

  return (
    <>
      <div className="general-info-block">
        <p className="general-info-row">Name: {customer.firstName}</p>
        <p className="general-info-row">Last name: {customer.lastName}</p>
        <p className="general-info-row">Date of birth: {customer.dateOfBirth}</p>
        <p className="general-info-row">Email: {customer.email}</p>
        {!editMode && (
          <button className="general-info-edit-btn" onClick={handleEditToggle}>
            Edit
          </button>
        )}
        {editMode && (
          <EditProfileModal
            customer={customer}
            onClose={handleEditToggle}
            onSave={handleSave}
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        )}
      </div>
      <UpdateResponse onClose={() => setIsSuccess(false)} isOpen={isSuccess} />
    </>
  );
};

export default GeneralInfo;

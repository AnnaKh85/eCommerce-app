import './GeneralInfo.css';

import React, { useState } from 'react';

import changeCustomerPassword from '../../services/api/changeCustomerPassword';
import updateCustomerData from '../../services/api/updateCustomerData';
import type {
  ChangedPassword,
  ChangeEmail,
  Customer,
  CustomerPasswordChange,
  CustomerUpdate,
  SetDateOfBirth,
  SetFirstName,
  SetLastName,
} from '../../services/interfaces';
import ChangePasswordModal from '../change-password-modal/ChangePasswordModal';
import EditProfileModal from '../edit-profile-modal/EditProfileModal';
import UpdateResponse from './UpdateResponse';

interface GeneralInfoProps {
  customer: Customer;
  onCustomerUpdate: (customer: Customer) => void;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ customer, onCustomerUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordChangeMode, setPasswordChangeMode] = useState(false);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handlePasswordChangeToggle = () => {
    setPasswordChangeMode(!passwordChangeMode);
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
        alert('Failed to save changes.Please try again.');
      }
    }
  };

  const handlePasswordSave = async (updatedPassword: ChangedPassword) => {
    const customerId = localStorage.getItem('customerId');
    if (customerId !== null) {
      const requestBody: CustomerPasswordChange = {
        id: customer.id,
        version: customer.version,
        currentPassword: updatedPassword.currentPassword,
        newPassword: updatedPassword.newPassword,
      };
      try {
        const updatedData = await changeCustomerPassword(requestBody);
        onCustomerUpdate(updatedData);
        setEditMode(false);
      } catch (error) {
        alert('Failed to save changes.Please try again.');
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
        <div className="general-info-edit-btn-block">
          {!editMode && (
            <button className="general-info-edit-btn" onClick={handleEditToggle}>
              Edit
            </button>
          )}
          {!passwordChangeMode && (
            <button className="general-info-edit-btn" onClick={handlePasswordChangeToggle}>
              Change Password
            </button>
          )}
        </div>
        {editMode && (
          <EditProfileModal
            customer={customer}
            onClose={handleEditToggle}
            onSave={handleSave}
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        )}

        {passwordChangeMode && (
          <ChangePasswordModal
            onClose={handlePasswordChangeToggle}
            onSave={handlePasswordSave}
            // onRegistrationSuccess={handleRegistrationSuccess}
          />
        )}
      </div>
      <UpdateResponse onClose={() => setIsSuccess(false)} isOpen={isSuccess} />
    </>
  );
};

export default GeneralInfo;

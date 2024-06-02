import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import GeneralInfo from '../components/generalInfo/GeneralInfo';
import type { Customer } from '../services/interfaces';

const mockCustomer: Customer = {
  id: '1',
  version: 1,
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  isEmailVerified: false,
  password: '123',
  addresses: [],
  defaultShippingAddressId: '',
  shippingAddressIds: [],
  defaultBillingAddressId: '',
  billingAddressIds: [],
  email: 'john.doe@example.com',
};

const mockOnCustomerUpdate = vi.fn();

describe('GeneralInfo Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Displays customer information correctly', () => {
    render(<GeneralInfo customer={mockCustomer} onCustomerUpdate={mockOnCustomerUpdate} />);

    expect(screen.getByText('Name: John')).toBeInTheDocument();
    expect(screen.getByText('Last name: Doe')).toBeInTheDocument();
    expect(screen.getByText('Date of birth: 1990-01-01')).toBeInTheDocument();
    expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
  });

  test('Edit button opens the EditProfileModal', () => {
    render(<GeneralInfo customer={mockCustomer} onCustomerUpdate={mockOnCustomerUpdate} />);

    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('Change Password button opens the ChangePasswordModal', () => {
    render(<GeneralInfo customer={mockCustomer} onCustomerUpdate={mockOnCustomerUpdate} />);

    fireEvent.click(screen.getByText('Change Password'));

    expect(screen.getByLabelText('Current password')).toBeInTheDocument();
    expect(screen.getByLabelText('New password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
  });
});

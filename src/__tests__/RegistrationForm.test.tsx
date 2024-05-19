import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react'; // Import React
import { BrowserRouter } from 'react-router-dom';

import RegistrationForm from '../components/registration-form/RegistrationForm.tsx';

describe('RegistrationForm Checkbox States', () => {
  // Define types for the parameters
  const renderWithRouter = (ui: React.ReactElement, { route = '/' }: { route?: string } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };
  it('should check defaultShippingAddress checkbox correctly', async () => {
    renderWithRouter(<RegistrationForm />);
    const defaultShippingAddressCheckbox = screen.getByLabelText('Set as default shipping address');
    expect(defaultShippingAddressCheckbox).not.toBeChecked();
    await userEvent.click(defaultShippingAddressCheckbox);
    expect(defaultShippingAddressCheckbox).toBeChecked();
  });

  it('should check defaultBillingAddress checkbox correctly when sameAddress is unchecked', async () => {
    renderWithRouter(<RegistrationForm />);
    const sameAddressCheckbox = screen.getByLabelText('Use the same address for both billing and shipping');
    await userEvent.click(sameAddressCheckbox); // Uncheck if initially checked
    await userEvent.click(sameAddressCheckbox); // Re-check to ensure it's unchecked for this test
    const defaultBillingAddressCheckbox = screen.getByRole('checkbox', { name: 'Set as default billing address' });
    expect(defaultBillingAddressCheckbox).not.toBeChecked();
    await userEvent.click(defaultBillingAddressCheckbox);
    expect(defaultBillingAddressCheckbox).toBeChecked();
  });

  it('should not allow defaultBillingAddress checkbox to be checked when sameAddress is checked', async () => {
    renderWithRouter(<RegistrationForm />);
    const sameAddressCheckbox = screen.getByLabelText('Use the same address for both billing and shipping');
    await userEvent.click(sameAddressCheckbox); // Ensure it's checked
    const defaultBillingAddressCheckbox = screen.queryByRole('checkbox', { name: 'Set as default billing address' });
    expect(defaultBillingAddressCheckbox).toBeNull();
  });

  it('should toggle sameAddress checkbox correctly', async () => {
    renderWithRouter(<RegistrationForm />);
    const sameAddressCheckbox = screen.getByLabelText('Use the same address for both billing and shipping');
    expect(sameAddressCheckbox).not.toBeChecked();
    await userEvent.click(sameAddressCheckbox);
    expect(sameAddressCheckbox).toBeChecked();
    await userEvent.click(sameAddressCheckbox);
    expect(sameAddressCheckbox).not.toBeChecked();
  });

  it('should ensure that checking sameAddress checkbox hides the billing address fields', async () => {
    renderWithRouter(<RegistrationForm />);
    const sameAddressCheckbox = screen.getByLabelText('Use the same address for both billing and shipping');
    await userEvent.click(sameAddressCheckbox);
    const billingAddressFields = screen.queryByText('Billing address');
    expect(billingAddressFields).toBeNull();
  });
});

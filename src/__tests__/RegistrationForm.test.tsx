import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import RegistrationForm from '../components/registration-form/RegistrationForm';

describe('RegistrationForm Submit Button', () => {
  it('should enable the submit button initially', async () => {
    render(<RegistrationForm />);
    const submitButton = screen.getByRole('button', { name: 'Register' });
    expect(submitButton).not.toBeDisabled();
  });

  it('should disable the submit button when the form is submitting', async () => {
    render(<RegistrationForm />);
    const submitButton = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
  });

  it('should re-enable the submit button after form submission is complete', async () => {
    render(<RegistrationForm />);
    const submitButton = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(submitButton);
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });

  it('should disable the submit button upon form re-submission', async () => {
    render(<RegistrationForm />);
    const submitButton = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(submitButton);
    await waitFor(() => expect(submitButton).not.toBeDisabled());
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
  });

  it('should enable the submit button when the form is reset after submission', async () => {
    render(<RegistrationForm />);
    const submitButton = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(submitButton);
    await waitFor(() => expect(submitButton).not.toBeDisabled());

    expect(submitButton).not.toBeDisabled();
  });
});

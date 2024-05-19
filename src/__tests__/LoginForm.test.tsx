import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import type { JSX } from 'react/jsx-runtime';
import { BrowserRouter as Router } from 'react-router-dom';

import LoginForm from '../components/login/Login.tsx';

describe('LoginForm', () => {
  const renderWithRouter = (
    ui: string | number | boolean | Iterable<ReactNode> | JSX.Element | null | undefined,
    { route = '/' } = {},
  ) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
  };

  test('renders LoginForm component', () => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('validates email input field on user input', () => {
    renderWithRouter(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    expect(emailInput.value).toBe('user@example.com');
  });

  test('validates password input field on user input', () => {
    renderWithRouter(<LoginForm />);
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });
});

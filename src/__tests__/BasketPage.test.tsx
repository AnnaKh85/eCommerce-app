import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import BasketPage from '../pages/BasketPage.tsx';
import { CATALOG_ROUTE } from '../services/constants';

describe('BasketPage', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <BasketPage />
      </BrowserRouter>,
    );
    expect(screen.getByText('Your shopping cart is empty')).toBeInTheDocument();
  });

  test('displays the empty cart message', () => {
    render(
      <BrowserRouter>
        <BasketPage />
      </BrowserRouter>,
    );
    expect(screen.getByText('Your shopping cart is empty')).toBeInTheDocument();
  });

  test('contains a link to the catalog page', () => {
    render(
      <BrowserRouter>
        <BasketPage />
      </BrowserRouter>,
    );
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', CATALOG_ROUTE);
  });

  test('link has correct text', () => {
    render(
      <BrowserRouter>
        <BasketPage />
      </BrowserRouter>,
    );
    expect(screen.getByText('Start to shopping')).toBeInTheDocument();
  });

  test('clicking the link navigates to the catalog page', async () => {
    render(
      <BrowserRouter>
        <BasketPage />
      </BrowserRouter>,
    );
    const user = userEvent.setup();
    const linkElement = screen.getByRole('link');
    await user.click(linkElement);
    expect(window.location.pathname).toBe(CATALOG_ROUTE);
  });
});

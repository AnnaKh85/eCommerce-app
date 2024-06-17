import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import Cart from '../components/cart/Cart.tsx';
import { useCart } from '../components/cart/useCarts.ts';

vi.mock('../components/cart/useCarts');
vi.mock('react-hot-toast');

const queryClient = new QueryClient();

const mockCart = {
  id: 'cart1',
  version: 1,
  lineItems: [
    {
      id: 'item1',
      productId: 'product1',
      name: { 'en-GB': 'Product 1' },
      quantity: 2,
      variant: {
        images: [{ url: 'image1.jpg' }],
        prices: [{ value: { centAmount: 1000 } }],
      },
      price: {
        discounted: null,
      },
    },
  ],
  totalPrice: { centAmount: 2000 },
};

describe('Cart Component', () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({ cart: mockCart });
  });

  it('renders the cart with items', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText('My Cart')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('20.00')).toBeInTheDocument();
  });

  it('handles clearing the cart', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    fireEvent.click(screen.getByText('Clear Shopping Cart'));
    fireEvent.click(screen.getByText('Clear my cart! 🧹'));

    expect(toast.error).not.toHaveBeenCalled();
  });

  it('displays empty cart message when there are no items', () => {
    (useCart as jest.Mock).mockReturnValue({ cart: { ...mockCart, lineItems: [] } });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Start to shopping')).toBeInTheDocument();
  });
});

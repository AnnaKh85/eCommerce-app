import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SortByPrice from '../components/sortOptions/SortByPrice.tsx';

describe('SortByPrice Component', () => {
  const mockSetSort = vi.fn();

  it('renders with default label and variant', () => {
    render(<SortByPrice setSort={mockSetSort} />);
    expect(screen.getByLabelText('Sort by price')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveClass('MuiSelect-standard');
  });

  it('renders with a custom label', () => {
    render(<SortByPrice setSort={mockSetSort} />);
    const label = screen.getByLabelText('Sort by price');
    expect(label).toBeInTheDocument();
  });

  it('renders with a custom variant', () => {
    render(<SortByPrice setSort={mockSetSort} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('MuiSelect-standard');
  });

  it('changes the sort state when a new option is selected', () => {
    render(<SortByPrice setSort={mockSetSort} />);
    const select = screen.getByLabelText('Sort by price');
    fireEvent.mouseDown(select);
    const option = screen.getByText('Price (Low to High)');
    fireEvent.click(option);
    expect(mockSetSort).toHaveBeenCalledWith('price asc');
  });

  it('renders all menu items correctly', () => {
    render(<SortByPrice setSort={mockSetSort} />);
    fireEvent.mouseDown(screen.getByRole('combobox'));
    expect(screen.getByText('Price (Low to High)')).toBeInTheDocument();
    expect(screen.getByText('Price (High to Low)')).toBeInTheDocument();
  });
});

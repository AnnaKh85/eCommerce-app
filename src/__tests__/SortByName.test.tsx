import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SortByName from '../components/sortOptions/SortByName.tsx';

describe('SortByName Component', () => {
  it('renders the select input with correct label', () => {
    render(<SortByName setSort={vi.fn()} />);
    expect(screen.getByLabelText(/Sort by name/i)).toBeInTheDocument();
  });

  it('renders the correct menu items', () => {
    render(<SortByName setSort={vi.fn()} />);

    fireEvent.mouseDown(screen.getByLabelText(/Sort by name/i));

    expect(screen.getByText(/Name \(A-Z\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Name \(Z-A\)/i)).toBeInTheDocument();
  });

  it('calls setSort with the correct value when an option is selected', () => {
    const setSortMock = vi.fn();
    render(<SortByName setSort={setSortMock} />);

    fireEvent.mouseDown(screen.getByLabelText(/Sort by name/i));

    fireEvent.click(screen.getByText(/Name \(A-Z\)/i));

    expect(setSortMock).toHaveBeenCalledWith('name.en-GB asc');
  });

  it('updates the state when an option is selected', () => {
    render(<SortByName setSort={vi.fn()} />);

    const selectElement = screen.getByLabelText(/Sort by name/i);

    fireEvent.mouseDown(selectElement);

    fireEvent.click(screen.getByText(/Name \(Z-A\)/i));

    expect(selectElement).toHaveTextContent('Name (Z-A)');
  });
});

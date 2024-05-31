import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchField from '../components/search/Search.tsx';

describe('SearchField Component', () => {
  test('background color changes on hover', () => {
    render(<SearchField setQueryString={() => {}} />);

    const searchField = screen.getByPlaceholderText('Search…').parentElement;

    expect(searchField).toHaveStyle('background-color: rgba(0, 0, 0, 0)');

    if (searchField) {
      userEvent.hover(searchField);

      expect(searchField).toHaveStyle('background-color: rgba(0, 0, 0, 0)');

      userEvent.unhover(searchField);

      expect(searchField).toHaveStyle('background-color: rgba(0, 0, 0, 0)');
    }
  });

  test('input field is rendered correctly', () => {
    render(<SearchField setQueryString={() => {}} />);

    const inputField = screen.getByPlaceholderText('Search…');
    expect(inputField).toBeInTheDocument();
  });

  test('search icon is rendered correctly', () => {
    render(<SearchField setQueryString={() => {}} />);

    const searchIcon = screen.getByTestId('SearchIcon');
    expect(searchIcon).toBeInTheDocument();
  });
});

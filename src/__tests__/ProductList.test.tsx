import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ProductList from '../components/products/ProductList.tsx';
import { useProducts } from '../components/products/useProducts.ts';
import { useSearch } from '../components/search/useSearch.ts';

// Mock the useProducts and useSearch hooks
vi.mock('../components/products/useProducts.ts');
vi.mock('../components/search/useSearch.ts');

describe('ProductList', () => {
  it('renders no ProductCards when there are no products', () => {
    (useProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      products: { results: [] },
      error: null,
    });
    (useSearch as jest.Mock).mockReturnValue({
      searchResult: null,
    });

    render(
      <ProductList
        selectedCategory={null}
        selectedPriceRange={null}
        selectedCountry={null}
        selectedMaterial={null}
        sort={null}
        queryString={null}
      />,
    );

    const productCards = screen.queryAllByTestId('product-card');
    expect(productCards).toHaveLength(0);
  });

  it('renders a loading indicator when products are loading', () => {
    (useProducts as jest.Mock).mockReturnValue({
      isLoading: true,
      products: null,
      error: null,
    });
    (useSearch as jest.Mock).mockReturnValue({
      searchResult: null,
    });

    render(
      <ProductList
        selectedCategory={null}
        selectedPriceRange={null}
        selectedCountry={null}
        selectedMaterial={null}
        sort={null}
        queryString={null}
      />,
    );

    const loadingIndicator = screen.getByRole('progressbar');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('renders an error message when there is an error', () => {
    const errorMessage = 'An error occurred';
    (useProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      products: null,
      error: { message: errorMessage },
    });
    (useSearch as jest.Mock).mockReturnValue({
      searchResult: null,
    });

    render(
      <ProductList
        selectedCategory={null}
        selectedPriceRange={null}
        selectedCountry={null}
        selectedMaterial={null}
        sort={null}
        queryString={null}
      />,
    );

    const errorElement = screen.getByText(`An error occurred: ${errorMessage}`);
    expect(errorElement).toBeInTheDocument();
  });
});

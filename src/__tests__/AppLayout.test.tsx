import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import AppLayout from '../pages/AppLayout.tsx';

// Mock components
// jest.mock('../components/loader/Loader', () => () => <div>Loader</div>);
// jest.mock('../components/TopNav/TopNav', () => () => <div>TopNav</div>);
// jest.mock('../components/TopNav/TopNavLinks', () => () => <div>TopNavLinks</div>);

describe('AppLayout Component', () => {
  test('renders Loader when navigation state is loading', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path="/test" element={<AppLayout />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.queryByText('Loader')).toBeInTheDocument();
  });

  test('renders TopNav component', () => {
    render(<AppLayout />);
    expect(screen.getByText('TopNav')).toBeInTheDocument();
  });

  test('renders TopNavLinks component', () => {
    render(<AppLayout />);
    expect(screen.getByText('TopNavLinks')).toBeInTheDocument();
  });

  test('renders Outlet component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<AppLayout />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

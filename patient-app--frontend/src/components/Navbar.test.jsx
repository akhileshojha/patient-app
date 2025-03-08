import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  // Helper function to render the component with Router
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  test('renders without crashing', () => {
    renderNavbar();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('displays the correct brand link', () => {
    renderNavbar();
    const brandLink = screen.getByRole('link', { name: /patient management/i });
    
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
    expect(brandLink).toHaveClass('text-xl', 'font-bold', 'text-gray-800');
  });

  test('displays the create patient link', () => {
    renderNavbar();
    const createLink = screen.getByRole('link', { name: /new patient/i });
    
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute('href', '/create');
  });

  test('create patient link has correct styling', () => {
    renderNavbar();
    const createLink = screen.getByRole('link', { name: /new patient/i });
    
    expect(createLink).toHaveClass(
      'bg-green-500',
      'text-white',
      'rounded-md',
      'hover:bg-green-600'
    );
  });

  test('has proper container styling', () => {
    renderNavbar();
    const nav = screen.getByRole('navigation');
    
    expect(nav).toHaveClass('bg-white', 'shadow-sm');
    expect(nav.querySelector('.container')).toHaveClass('mx-auto', 'px-4', 'py-4');
  });
});

test('links are keyboard-navigable', async () => {
  const { user } = setup();
  await user.tab();
  expect(screen.getByText(/patient management/i)).toHaveFocus();
  await user.tab();
  expect(screen.getByText(/new patient/i)).toHaveFocus();
});

test('matches snapshot', () => {
  const { asFragment } = renderNavbar();
  expect(asFragment()).toMatchSnapshot();
});

test('has responsive layout on mobile', () => {
  window.innerWidth = 375; // iPhone width
  renderNavbar();
  expect(screen.getByRole('navigation')).toHaveClass('flex-col');
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { AppContext } from '../../context/AppContext';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react-helmet', () => ({ Helmet: ({ children }) => <>{children}</> }));

describe('Navbar component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: {
        removeItem: vi.fn(),
      },
      writable: true,
    });
  });

  it('renders logo and nav links', () => {
    const contextValue = { token: null, setToken: vi.fn(), userData: null };
    render(
      <MemoryRouter>
        <AppContext.Provider value={contextValue}>
          <Navbar />
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Doctors').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Sign Up').length).toBeGreaterThanOrEqual(1);
  });

  it('shows user area and logout behavior when logged in', () => {
    const setToken = vi.fn();
    const contextValue = {
      token: 'abc123',
      setToken,
      userData: { name: 'Test User', image: '', cartItems: [1, 2] },
    };

    render(
      <MemoryRouter>
        <AppContext.Provider value={contextValue}>
          <Navbar />
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByText('Test User'));
    expect(screen.getAllByText('Logout').length).toBeGreaterThan(0);

    fireEvent.click(screen.getAllByText('Logout')[0]);
    expect(setToken).toHaveBeenCalledWith(null);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('navigates to home when logo clicked', () => {
    const contextValue = { token: null, setToken: vi.fn(), userData: null };

    render(
      <MemoryRouter>
        <AppContext.Provider value={contextValue}>
          <Navbar />
        </AppContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('Logo'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

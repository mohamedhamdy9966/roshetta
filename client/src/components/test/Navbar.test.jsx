import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { AppContext } from '../../context/AppContext';
import { vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    NavLink: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react-helmet', () => ({ Helmet: ({ children }) => <>{children}</> }));

describe('Navbar component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo and nav links', () => {
    const contextValue = { token: null, setToken: vi.fn(), userData: null };
    render(
      <AppContext.Provider value={contextValue}>
        <Navbar />
      </AppContext.Provider>
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Doctors')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('shows user area and logout behavior when logged in', () => {
    const setToken = vi.fn();
    const contextValue = {
      token: 'abc123',
      setToken,
      userData: { name: 'Test User', image: '', cartItems: [1, 2] },
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Navbar />
      </AppContext.Provider>
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test User'));
    expect(screen.getByText('Logout')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Logout'));
    expect(setToken).toHaveBeenCalledWith(null);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('navigates to home when logo clicked', () => {
    const contextValue = { token: null, setToken: vi.fn(), userData: null };

    render(
      <AppContext.Provider value={contextValue}>
        <Navbar />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByAltText('Logo'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

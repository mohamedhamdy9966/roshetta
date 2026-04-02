import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DoctorsBanner from '../DoctorsBanner';

vi.mock('react-helmet', () => ({ Helmet: ({ children }) => <>{children}</> }));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../assets/assets', () => ({
  assets: {
    appointment_img: 'appointment_img.png',
  },
}));

describe('DoctorsBanner component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  it('renders title, subtitle, button, and image', () => {
    render(<DoctorsBanner />);

    expect(screen.getByText(/Book Appointment/i)).toBeInTheDocument();
    expect(screen.getByText(/With 100\+ Trusted Doctors/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    expect(screen.getByAltText('appointment-img')).toBeInTheDocument();
  });

  it('navigates to login and scrolls on button click', () => {
    render(<DoctorsBanner />);

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});

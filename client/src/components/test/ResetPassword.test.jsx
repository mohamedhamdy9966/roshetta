import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from '../ResetPassword';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('axios');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: { userId: '123', email: 'test@example.com' } }),
  };
});

vi.mock('react-helmet', () => ({ Helmet: ({ children }) => <>{children}</> }));

describe('ResetPassword component', () => {
  const contextValue = { backendUrl: 'http://localhost' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('submits a successful password reset and navigates to login', async () => {
    const postSpy = axios.post.mockResolvedValue({ data: { success: true, message: 'Password reset successful' } });
    const toastSuccess = vi.spyOn(toast, 'success').mockImplementation(() => {});
    const toastError = vi.spyOn(toast, 'error').mockImplementation(() => {});

    render(
      <AppContext.Provider value={contextValue}>
        <ResetPassword />
      </AppContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter 6-digit OTP/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter new password/i), { target: { value: 'newpassword' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm new password/i), { target: { value: 'newpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /Reset Password/i }));

    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith('http://localhost/api/user/reset-password', {
        userId: '123',
        otp: '123456',
        newPassword: 'newpassword',
      });
      expect(toastSuccess).toHaveBeenCalledWith('Password reset successful');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
      expect(toastError).not.toHaveBeenCalled();
    });
  });

  it('shows error toast when reset-password API returns failure', async () => {
    axios.post.mockResolvedValue({ data: { success: false, message: 'OTP invalid' } });
    const toastError = vi.spyOn(toast, 'error').mockImplementation(() => {});

    render(
      <AppContext.Provider value={contextValue}>
        <ResetPassword />
      </AppContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter 6-digit OTP/i), { target: { value: '000000' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter new password/i), { target: { value: 'newpassword' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm new password/i), { target: { value: 'newpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /Reset Password/i }));

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith('OTP invalid');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it('calls resend OTP endpoint when clicked', async () => {
    axios.post.mockResolvedValue({ data: { success: true, message: 'OTP resent' } });
    const toastSuccess = vi.spyOn(toast, 'success').mockImplementation(() => {});

    render(
      <AppContext.Provider value={contextValue}>
        <ResetPassword />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText(/Resend OTP/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost/api/user/send-reset-otp', { email: 'test@example.com' });
      expect(toastSuccess).toHaveBeenCalledWith('OTP resent');
    });
  });
});

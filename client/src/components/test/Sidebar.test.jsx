import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { vi } from 'vitest';

describe('Sidebar component', () => {
  it('renders navigation and search area', () => {
    const setSelectedUser = vi.fn();

    render(<Sidebar selectedUser={null} setSelectedUser={setSelectedUser} />);

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Groups...')).toBeInTheDocument();
    expect(screen.getByAltText('Menu')).toBeInTheDocument();
  });

  it('renders user list and highlights selected user', () => {
    const setSelectedUser = vi.fn();
    render(<Sidebar selectedUser={{ id: '2' }} setSelectedUser={setSelectedUser} />);

    expect(screen.getByRole('button', { name: /John Doe/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Jane Smith/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dr. Alice/i })).toBeInTheDocument();

    const selectedButton = screen.getByRole('button', { name: /Jane Smith/i });
    expect(selectedButton).toHaveClass('bg-gray-600');
  });

  it('calls setSelectedUser when a user is clicked', () => {
    const setSelectedUser = vi.fn();
    render(<Sidebar selectedUser={null} setSelectedUser={setSelectedUser} />);

    fireEvent.click(screen.getByRole('button', { name: /John Doe/i }));
    expect(setSelectedUser).toHaveBeenCalledWith({ id: '1', name: 'John Doe', status: 'Active' });
  });
});

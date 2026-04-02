import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DoctorSpecialty from '../DoctorSpecialty';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-helmet', () => ({ Helmet: ({ children }) => <>{children}</> }));

vi.mock('framer-motion', () => {
  const Fake = ({ children, ...props }) => <div {...props}>{children}</div>;
  return {
    motion: {
      div: Fake,
      h2: Fake,
      p: Fake,
      a: Fake,
    },
  };
});

describe('DoctorSpecialty component', () => {
  it('renders specialty cards and links', () => {
    render(
      <MemoryRouter>
        <DoctorSpecialty />
      </MemoryRouter>
    );

    expect(screen.getByText(/Find by Specialty/i)).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list/i)).toBeInTheDocument();

    expect(screen.getByText(/General physician/i)).toBeInTheDocument();
    expect(screen.getByText(/Gynecologist/i)).toBeInTheDocument();
    expect(screen.getByText(/Dermatologist/i)).toBeInTheDocument();

    const link = screen.getByText(/General physician/i).closest('a');
    expect(link).toHaveAttribute('href', '/doctors/general-physician');
  });

  it('scrolls to top when a specialty link is clicked', () => {
    window.scrollTo = vi.fn();

    render(
      <MemoryRouter>
        <DoctorSpecialty />
      </MemoryRouter>
    );

    const link = screen.getByText(/General physician/i).closest('a');
    fireEvent.click(link);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});

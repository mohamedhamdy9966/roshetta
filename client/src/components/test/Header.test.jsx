import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { vi } from 'vitest';

vi.mock('framer-motion', () => {
  const Fake = ({ children, ...props }) => <div {...props}>{children}</div>;
  return {
    motion: {
      div: Fake,
      h1: Fake,
      p: Fake,
      a: Fake,
      img: Fake,
    },
    useAnimation: () => ({ start: vi.fn() }),
  };
});

vi.mock('react-intersection-observer', () => ({
  useInView: () => [vi.fn(), false],
}));

vi.mock('../assets/assets', () => ({
  assets: {
    group_profiles: 'group_profiles.png',
    header_img: 'header_img.png',
  },
}));

describe('Header component', () => {
  it('renders static heading and button', () => {
    render(<Header />);

    expect(screen.getByText(/Premium Healthcare/i)).toBeInTheDocument();
    expect(screen.getByText(/At Your Fingertips/i)).toBeInTheDocument();
    expect(screen.getByText(/Book Now/i)).toBeInTheDocument();
    expect(screen.getByAltText('Happy patients')).toBeInTheDocument();
  });

  it('renders the component with hero content and booking button', () => {
    render(<Header />);

    expect(screen.getByText(/Premium Healthcare/i)).toBeInTheDocument();
    expect(screen.getByText(/At Your Fingertips/i)).toBeInTheDocument();
    expect(screen.getByText(/Book Now/i)).toBeInTheDocument();
  });
});

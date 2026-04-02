import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer component', () => {
  it('renders footer with brand, quick links, and contact info', () => {
    render(<Footer />);

    expect(screen.getAllByText(/Roshetta/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Contact Us/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Emergency/i)).toBeInTheDocument();

    expect(screen.getByText('+20-120-722-6094')).toBeInTheDocument();
    expect(screen.getByText('support@roshetta.com')).toBeInTheDocument();
    expect(screen.getByText('Cairo, Egypt')).toBeInTheDocument();

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});

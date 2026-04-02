import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RelatedDoctors from '../RelatedDoctors';
import { AppContext } from '../../context/AppContext';
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

describe('RelatedDoctors component', () => {
  const doctors = [
    { _id: '1', name: 'Dr A', specialty: 'Cardiology', image: 'a.jpg' },
    { _id: '2', name: 'Dr B', specialty: 'Cardiology', image: 'b.jpg' },
    { _id: '3', name: 'Dr C', specialty: 'Cardiology', image: 'c.jpg' },
    { _id: '4', name: 'Dr D', specialty: 'Cardiology', image: 'd.jpg' },
    { _id: '5', name: 'Dr E', specialty: 'Cardiology', image: 'e.jpg' },
    { _id: '6', name: 'Dr F', specialty: 'Cardiology', image: 'f.jpg' },
    { _id: '7', name: 'Dr G', specialty: 'Dermatology', image: 'g.jpg' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  it('renders the section and top 5 related doctors excluding current docId', () => {
    render(
      <AppContext.Provider value={{ doctors }}>
        <RelatedDoctors specialty="Cardiology" docId="3" />
      </AppContext.Provider>
    );

    expect(screen.getByText('Top Doctors to Book')).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list/i)).toBeInTheDocument();

    // Should show 5 doctors max and skip the one with docId=3
    const cards = screen.getAllByAltText('doctor');
    expect(cards).toHaveLength(5);
    expect(screen.queryByText('Dr C')).not.toBeInTheDocument();
  });

  it('navigates to appointment page when doctor card is clicked', () => {
    render(
      <AppContext.Provider value={{ doctors }}>
        <RelatedDoctors specialty="Cardiology" docId="10" />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText('Dr A'));

    expect(mockNavigate).toHaveBeenCalledWith('/appointment/1');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('navigates to doctors page when more button is clicked', () => {
    render(
      <AppContext.Provider value={{ doctors }}>
        <RelatedDoctors specialty="Cardiology" docId="10" />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /more/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/doctors');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppContext } from "../../context/AppContext";
import TopDoctors from "../TopDoctors";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("react-helmet", () => ({ Helmet: ({ children }) => <>{children}</> }));

describe("TopDoctors component", () => {
  const doctors = Array.from({ length: 10 }, (_, i) => ({
    _id: `${i + 1}`,
    name: `Dr Example ${i + 1}`,
    specialty: "General Medicine",
    image: "https://example.com/doctor.jpg",
    available: i % 2 === 0,
    rating: (4.5 + (i % 3) * 0.1).toFixed(1),
    experience: 5 + i,
  }));

  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  it("renders header and exactly eight doctors cards", () => {
    render(
      <AppContext.Provider value={{ doctors }}>
        <TopDoctors />
      </AppContext.Provider>
    );

    expect(screen.getByText(/Our Top Specialists/i)).toBeInTheDocument();
    expect(screen.getByText(/Book appointments with our most experienced medical professionals/i)).toBeInTheDocument();

    // 8 doctors are sliced
    expect(screen.getAllByRole("button", { name: /Book Appointment/i })).toHaveLength(8);

    // one of the totals
    expect(screen.getByText("Dr Example 1")).toBeInTheDocument();
    expect(screen.getByText("Dr Example 8")).toBeInTheDocument();
    expect(screen.queryByText("Dr Example 9")).not.toBeInTheDocument();
  });

  it("navigates to doctor details when a doctor card is clicked", () => {
    render(
      <AppContext.Provider value={{ doctors }}>
        <TopDoctors />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText("Dr Example 3"));

    expect(mockNavigate).toHaveBeenCalledWith("/my-appointments/3");
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("navigates to all doctors page when CTA button clicked", () => {
    render(
      <AppContext.Provider value={{ doctors }}>
        <TopDoctors />
      </AppContext.Provider>
    );

    const viewAllBtn = screen.getByRole("button", { name: /View All Doctors/i });
    fireEvent.click(viewAllBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/doctors");
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import VerifyEmail from "../VerifyEmail";
import axios from "axios";
import { toast } from "react-toastify";
import { vi } from "vitest";

vi.mock("axios");
vi.mock("react-helmet", () => ({ Helmet: ({ children }) => <>{children}</> }));

describe("VerifyEmail component", () => {
  const contextValue = {
    backendUrl: "http://localhost",
    token: null,
    setToken: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form and title", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/verify-email", state: { userId: "123" } }]}
      >
        <AppContext.Provider value={contextValue}>
          <VerifyEmail />
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Verify Your Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter 6-digit OTP/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Verify Email/i })).toBeInTheDocument();
  });

  it("submits OTP and shows success toast when API responds success", async () => {
    axios.post.mockResolvedValue({ data: { success: true, message: "Verified" } });
    const toastSuccessSpy = vi.spyOn(toast, "success").mockImplementation(() => {});
    const toastErrorSpy = vi.spyOn(toast, "error").mockImplementation(() => {});

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/verify-email", state: { userId: "123" } }]}
      >
        <AppContext.Provider value={contextValue}>
          <VerifyEmail />
        </AppContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter 6-digit OTP/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Verify Email/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${contextValue.backendUrl}/api/user/verify-account`,
        { userId: "123", otp: "123456" }
      );
    });

    expect(toastSuccessSpy).toHaveBeenCalledWith("Verified");
    expect(toastErrorSpy).not.toHaveBeenCalled();
  });

  it("handles resend OTP call and error toast on API failure", async () => {
    axios.post.mockRejectedValue(new Error("Network error"));
    const toastErrorSpy = vi.spyOn(toast, "error").mockImplementation(() => {});

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/verify-email", state: { userId: "123" } }]}
      >
        <AppContext.Provider value={contextValue}>
          <VerifyEmail />
        </AppContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Resend OTP/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${contextValue.backendUrl}/api/user/send-verify-otp`,
        { userId: "123" },
        { headers: { token: contextValue.token } }
      );
    });

    expect(toastErrorSpy).toHaveBeenCalledWith("Network error");
  });
});
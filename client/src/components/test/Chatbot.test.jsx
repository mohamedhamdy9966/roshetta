import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import Chatbot from "../Chatbot";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

vi.mock("axios");
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    info: vi.fn(),
  },
}));

const defaultContext = {
  token: "token-abc",
  userData: null,
  doctors: [],
  backendUrl: "http://localhost",
  chatbotContext: { labs: [] },
};

const setup = (contextOverrides = {}) => {
  const providerValues = { ...defaultContext, ...contextOverrides };

  return render(
    <AppContext.Provider value={providerValues}>
      <Chatbot />
    </AppContext.Provider>
  );
};

beforeEach(() => {
  global.URL.createObjectURL = vi.fn(() => "blob://dummy");
  axios.get.mockResolvedValue({ data: { success: true, appointments: [] } });
  // Mock scrollIntoView for the messages bottom ref
  global.HTMLElement.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("Chatbot", () => {
  it("renders toggle button and opens chat panel", () => {
    setup();
    expect(screen.getByRole("button", { name: /chat/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /chat/i }));
    expect(screen.getByRole("heading", { name: /roshetta assistant/i })).toBeInTheDocument();
  });

  it("displays personalized greeting when user data is provided", () => {
    setup({ userData: { name: "Aya" } });

    fireEvent.click(screen.getByRole("button", { name: /chat/i }));

    expect(
      screen.getByText(
        /hello aya! i'm roshetta assistant\. how can i assist you with your healthcare needs today\?/i
      )
    ).toBeInTheDocument();
  });

  it("displays default greeting when no user data is provided", () => {
    setup({ userData: null });

    fireEvent.click(screen.getByRole("button", { name: /chat/i }));

    expect(
      screen.getByText(/hello! i'm roshetta assistant\. how can i assist you/i)
    ).toBeInTheDocument();
  });

  it("shows error toast when submitting empty message", async () => {
    setup({ userData: null });

    fireEvent.click(screen.getByRole("button", { name: /chat/i }));

    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Message cannot be empty when no file is selected"
      );
    });

    expect(axios.post).not.toHaveBeenCalled();
  });

  it("sends text message and receives bot reply", async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true, reply: "Hi there" } });

    setup({ userData: { name: "Karim" } });

    fireEvent.click(screen.getByRole("button", { name: /chat/i }));

    const input = screen.getByPlaceholderText(/type your message/i);
    fireEvent.change(input, { target: { value: "Hello" } });

    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/hi there/i)).toBeInTheDocument();
    });

    expect(axios.post).toHaveBeenCalledWith(
      `${defaultContext.backendUrl}/api/user/analyze-text`,
      { message: "Hello" },
      expect.any(Object)
    );
  });

  it("closes chat panel when toggle button is clicked twice", () => {
    setup();

    const toggleButton = screen.getByRole("button", { name: /chat/i });
    fireEvent.click(toggleButton);
    expect(screen.getByRole("heading", { name: /roshetta assistant/i })).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByRole("heading", { name: /roshetta assistant/i })).not.toBeInTheDocument();
  });
});

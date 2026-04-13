import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AppContextProvider, {
  useAppContext,
} from "../AppContext.jsx";
import axios from "axios";

const ContextProbe = () => {
  const { calculateAge, slotDateFormat, currency, axios: contextAxios } =
    useAppContext();

  return (
    <div>
      <span data-testid="currency">{currency}</span>
      <span data-testid="valid-age">{calculateAge("2000-01-15")}</span>
      <span data-testid="invalid-age">{calculateAge("not-a-date")}</span>
      <span data-testid="formatted-slot">
        {slotDateFormat("05_12_2026")}
      </span>
      <span data-testid="axios-match">
        {String(contextAxios === axios)}
      </span>
    </div>
  );
};

describe("AppContext", () => {
  it("provides currency, helpers, and axios through context", () => {
    render(
      <AppContextProvider>
        <ContextProbe />
      </AppContextProvider>,
    );

    expect(screen.getByTestId("currency").textContent).toBe("EGP");
    expect(screen.getByTestId("valid-age").textContent).toMatch(/^\d+$/);
    expect(screen.getByTestId("invalid-age").textContent).toBe("Unknown");
    expect(screen.getByTestId("formatted-slot").textContent).toBe(
      "05 DEC 2026",
    );
    expect(screen.getByTestId("axios-match").textContent).toBe("true");
  });

  it("throws when useAppContext is used outside the provider", () => {
    const ConsumerWithoutProvider = () => {
      useAppContext();
      return null;
    };

    expect(() => render(<ConsumerWithoutProvider />)).toThrow(
      "useAppContext must be used within an AppContextProvider",
    );
  });
});

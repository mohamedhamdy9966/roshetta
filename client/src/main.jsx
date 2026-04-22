import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.jsx";
import "./i18n"; // Add this line
import React, { Suspense } from "react"; // Add Suspense

createRoot(document.getElementById("root")).render(
  <Suspense fallback="Loading...">
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </Suspense>,
);

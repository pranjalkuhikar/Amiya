import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LenisProvider from "./components/LenisProvider";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { clerkAppearance } from "./clerk-appearance";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ClerkProvider
          publishableKey={PUBLISHABLE_KEY}
          appearance={clerkAppearance}
        >
          <LenisProvider>
            <App />
            <ToastContainer
              style={{ color: "black" }}
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </LenisProvider>
        </ClerkProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

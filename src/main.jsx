import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LenisProvider from "./components/LenisProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LenisProvider>
        <App />
      </LenisProvider>
    </BrowserRouter>
  </StrictMode>
);

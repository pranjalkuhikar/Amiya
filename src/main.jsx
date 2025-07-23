import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LenisProvider from "./components/LenisProvider";
import { Provider } from "react-redux";
import { store } from "./app/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LenisProvider>
          <App />
        </LenisProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

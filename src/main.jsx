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




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LenisProvider>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="auto"
          />
        </LenisProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

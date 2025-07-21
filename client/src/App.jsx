import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
};

export default App;
